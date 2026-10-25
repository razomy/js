/**
 * Интерфейс DI для PostgreSQL (совместим с pg.Pool, pg.Client, pg.PoolClient и любым моком)
 */
export interface DbExecutor {
  query<R = any>(text: string, values?: unknown[]): Promise<{ rows: R[]; rowCount?: number | null }>;
  connect?(): Promise<DbExecutor & { release(): void }>;
}

export type EntityDataType =
  | 'String'
  | 'Char'
  | 'Text'
  | 'SmallInt'
  | 'Int'
  | 'BigInt'
  | 'Decimal'
  | 'Float'
  | 'Double'
  | 'Bool'
  | 'Date'
  | 'Time'
  | 'Timestamp'
  | 'Timestamptz'
  | 'Uuid'
  | 'Jsonb'
  | 'Bytea'
  | 'Inet';

export interface FieldMeta {
  col: string;
  type: EntityDataType;
  isArray: boolean;
  maxLength: number;
  nullable: boolean;
  hasDefault: boolean;
}

export interface TableMeta {
  tableName: string;
  pkField: string;
  pkCol: string;
  fields: Record<string, FieldMeta>;
}

export interface SqlQuery {
  sql: string;
  values: unknown[];
}

export interface EntityComponentMethods<TProps, TRow> {
  readonly $dirty: ReadonlySet<string>;
  readonly $isDirty: boolean;
  readonly $isNew: boolean;
  $toRow(): TRow;
  $toJson(): Required<TProps>;
  $commit(freshRow?: Partial<TRow>): void;
  $toInsertSql(): SqlQuery;
  $toUpdateSql(): SqlQuery | null;
  /** Привязывает инстанс pg (Pool / Transaction Client) к сущности */
  $bindDb(db: DbExecutor): this;
  /** Сохраняет сущность в БД (INSERT если новая, UPDATE только $dirty полей если существующая) */
  $save(db?: DbExecutor): Promise<this>;
  /** Удаляет сущность из БД по Primary Key */
  $delete(db?: DbExecutor): Promise<boolean>;
  /** Перезагружает актуальные данные сущности из БД */
  $reload(db?: DbExecutor): Promise<this>;
}

export type EntityProxy<TProps, TRow> = Required<TProps> & EntityComponentMethods<TProps, TRow>;

export function createEntityProxy<TProps extends Record<string, any>, TRow extends Record<string, any>>(
  meta: TableMeta,
  initial: Record<string, any>,
  options: { isFromDb?: boolean; db?: DbExecutor } = {}
): EntityProxy<TProps, TRow> {
  const rowData: Record<string, any> = {};
  const dirtyCols = new Set<string>();
  let isNew = !options.isFromDb;
  let boundDb: DbExecutor | undefined = options.db;

  for (const [propName, fieldMeta] of Object.entries(meta.fields)) {
    const val = initial[propName] !== undefined ? initial[propName] : initial[fieldMeta.col];
    rowData[fieldMeta.col] = val ?? null;
    if (isNew && val !== undefined) {
      dirtyCols.add(fieldMeta.col);
    }
  }

  function resolveDb (explicitDb?: DbExecutor) : DbExecutor {
        const target = explicitDb || boundDb;
        if (!target) {
          throw new Error(`[${meta.tableName}] БД не привязана! Передай pg.Pool в createDbContext(pool) или в метод .$save(pool)`);
        }
        return target;
      }

  let proxyInstance: any;

  const methods: EntityComponentMethods<TProps, TRow> = {
    get $dirty() {
      return dirtyCols;
    },
    get $isDirty() {
      return dirtyCols.size > 0;
    },
    get $isNew() {
      return isNew;
    },
    $toRow() {
      return { ...rowData } as TRow;
    },
    $toJson() {
      const res: Record<string, any> = {};
      for (const [propName, fMeta] of Object.entries(meta.fields)) {
        res[propName] = rowData[fMeta.col];
      }
      return res as Required<TProps>;
    },
    $commit(freshRow?: Partial<TRow>) {
      if (freshRow) {
        for (const fMeta of Object.values(meta.fields)) {
          if (fMeta.col in freshRow) {
            rowData[fMeta.col] = (freshRow as any)[fMeta.col];
          }
        }
      }
      dirtyCols.clear();
      isNew = false;
    },
    $toInsertSql(): SqlQuery {
      const cols: string[] = [];
      const placeholders: string[] = [];
      const values: unknown[] = [];

      for (const fMeta of Object.values(meta.fields)) {
        const val = rowData[fMeta.col];
        if (val === null && fMeta.hasDefault) continue;
        cols.push(fMeta.col);
        values.push(val);
        placeholders.push(`$${values.length}`);
      }

      return {
        sql: `INSERT INTO ${meta.tableName} (${cols.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING *;`,
        values,
      };
    },
    $toUpdateSql(): SqlQuery | null {
      if (dirtyCols.size === 0) return null;

      const sets: string[] = [];
      const values: unknown[] = [];

      for (const col of dirtyCols) {
        if (col === meta.pkCol) continue;
        values.push(rowData[col]);
        sets.push(`${col} = $${values.length}`);
      }

      if (sets.length === 0) return null;

      values.push(rowData[meta.pkCol]);
      const pkParam = `$${values.length}`;

      return {
        sql: `UPDATE ${meta.tableName} SET ${sets.join(', ')} WHERE ${meta.pkCol} = ${pkParam} RETURNING *;`,
        values,
      };
    },
    $bindDb(db: DbExecutor) {
      boundDb = db;
      return proxyInstance;
    },
    async $save(explicitDb?: DbExecutor) {
      const db = resolveDb(explicitDb);

      if (isNew) {
        const { sql, values } = methods.$toInsertSql();
        const res = await db.query<TRow>(sql, values);
        methods.$commit(res.rows[0]);
        return proxyInstance;
      }

      const updateQuery = methods.$toUpdateSql();
      if (!updateQuery) return proxyInstance; // Ничего не менялось — запрос в БД не делаем!

      const res = await db.query<TRow>(updateQuery.sql, updateQuery.values);
      methods.$commit(res.rows[0]);
      return proxyInstance;
    },
    async $delete(explicitDb?: DbExecutor) {
      const db = resolveDb(explicitDb);
      const pkVal = rowData[meta.pkCol];
      const res = await db.query(`DELETE FROM ${meta.tableName} WHERE ${meta.pkCol} = $1;`, [pkVal]);
      return (res.rowCount ?? 0) > 0;
    },
    async $reload(explicitDb?: DbExecutor) {
      const db = resolveDb(explicitDb);
      const pkVal = rowData[meta.pkCol];
      const res = await db.query<TRow>(`SELECT * FROM ${meta.tableName} WHERE ${meta.pkCol} = $1 LIMIT 1;`, [pkVal]);
      if (res.rows[0]) {
        methods.$commit(res.rows[0]);
      }
      return proxyInstance;
    },
  };

  proxyInstance = new Proxy(rowData, {
    get(target, prop: string) {
      if (prop in methods) {
        const val = (methods as any)[prop];
        return typeof val === 'function' ? val.bind(methods) : val;
      }
      const fMeta = meta.fields[prop];
      if (fMeta) return target[fMeta.col];
      if (prop in target) return target[prop];
      return undefined;
    },
    set(target, prop: string, newValue: any) {
      const fMeta = meta.fields[prop];
      if (!fMeta) {
        throw new Error(`[${meta.tableName}] Неизвестное свойство "${prop}"`);
      }

      if (newValue === null || newValue === undefined) {
        if (!fMeta.nullable) {
          throw new Error(`[${meta.tableName}.${prop}] Поле NOT NULL не может быть null`);
        }
        newValue = null;
      } else if ((fMeta.type === 'String' || fMeta.type === 'Char') && !fMeta.isArray && typeof newValue === 'string') {
        if (fMeta.maxLength > 0 && newValue.length > fMeta.maxLength) {
          throw new Error(`[${meta.tableName}.${prop}] Длина ${newValue.length} превышает лимит ${fMeta.maxLength}`);
        }
      }

      if (target[fMeta.col] !== newValue) {
        target[fMeta.col] = newValue;
        dirtyCols.add(fMeta.col);
      }
      return true;
    },
    ownKeys() {
      return Object.keys(meta.fields);
    },
    getOwnPropertyDescriptor(target, prop: string) {
      if (prop in meta.fields) {
        return { enumerable: true, configurable: true, value: target[meta.fields[prop].col] };
      }
      return undefined;
    },
  });

  return proxyInstance as EntityProxy<TProps, TRow>;
}

/**
 * Универсальный Репозиторий таблицы с внедренным DbExecutor (pg.Pool / pg.Client)
 */
export class EntityRepository<TProps extends Record<string, any>, TRow extends Record<string, any>, TPk = string> {
  constructor(
    private readonly meta: TableMeta,
    private readonly db: DbExecutor
  ) {}

  /** Создает новый Proxy-экземпляр в памяти (привязанный к БД, но еще не сохраненный) */
  create(props: TProps): EntityProxy<TProps, TRow> {
    return createEntityProxy<TProps, TRow>(this.meta, props, { isFromDb: false, db: this.db });
  }

  /** Создает и сразу вставляет запись в БД (INSERT ... RETURNING *) */
  async insert(props: TProps): Promise<EntityProxy<TProps, TRow>> {
    const entity = this.create(props);
    return entity.$save();
  }

  /** Находит запись по Primary Key и возвращает реактивный Proxy */
  async findByPk(pk: TPk): Promise<EntityProxy<TProps, TRow> | null> {
    const sql = `SELECT * FROM ${this.meta.tableName} WHERE ${this.meta.pkCol} = $1 LIMIT 1;`;
    const res = await this.db.query<TRow>(sql, [pk]);
    if (!res.rows[0]) return null;
    return createEntityProxy<TProps, TRow>(this.meta, res.rows[0], { isFromDb: true, db: this.db });
  }

  /** Поиск записей по частичному совпадению полей (camelCase) */
  async findMany(where?: Partial<TProps>, limit = 100): Promise<Array<EntityProxy<TProps, TRow>>> {
    const clauses: string[] = [];
    const values: unknown[] = [];

    if (where) {
      for (const [key, val] of Object.entries(where)) {
        if (val === undefined) continue;
        const fMeta = this.meta.fields[key];
        const col = fMeta ? fMeta.col : key;
        if (val === null) {
          clauses.push(`${col} IS NULL`);
        } else {
          values.push(val);
          clauses.push(`${col} = $${values.length}`);
        }
      }
    }

    const whereSql = clauses.length > 0 ? `WHERE ${clauses.join(' AND ')}` : '';
    const sql = `SELECT * FROM ${this.meta.tableName} ${whereSql} LIMIT ${Number(limit)};`;
    const res = await this.db.query<TRow>(sql, values);

    return res.rows.map((row) =>
      createEntityProxy<TProps, TRow>(this.meta, row, { isFromDb: true, db: this.db })
    );
  }

  /** Удаление по Primary Key */
  async deleteByPk(pk: TPk): Promise<boolean> {
    const sql = `DELETE FROM ${this.meta.tableName} WHERE ${this.meta.pkCol} = $1;`;
    const res = await this.db.query(sql, [pk]);
    return (res.rowCount ?? 0) > 0;
  }
}
