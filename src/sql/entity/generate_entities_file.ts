// --- START OF FILE generate_entities_file.ts ---

import * as fs from 'node:fs';
import * as path from 'node:path';
import * as sql from '@razomy/sql';

const tsTypeMap: Record<sql.DataType, string> = {
  // Строковые
  String: 'string',
  Char: 'string',
  Text: 'string',

  // Числовые
  SmallInt: 'number',
  Int: 'number',
  // В JS Number безопасен только до 2^53 - 1, поэтому драйвер pg возвращает BIGINT (64 бит) как string
  BigInt: 'string | number | bigint',
  // Драйвер pg возвращает NUMERIC/DECIMAL как string, чтобы не потерять копейки при округлении в JS Float
  Decimal: 'string | number',
  Float: 'number',
  Double: 'number',

  // Логические
  Bool: 'boolean',

  // Дата и время
  Date: 'Date | string',
  Time: 'string', // Время без даты (например "14:30:00") приходит строкой
  Timestamp: 'Date | string',
  Timestamptz: 'Date | string',

  // Специфичные для PostgreSQL
  Uuid: 'string',
  Jsonb: 'Record<string, unknown> | unknown[]',
  Bytea: 'Buffer | Uint8Array',
  Inet: 'string',
};

function toPascalCase(str: string): string {
  return str.replace(/(^\w|_\w)/g, (m) => m.replace('_', '').toUpperCase());
}

function formatTsType(def: sql.migration.NormalizedColumn): string {
  const base = tsTypeMap[def.type];
  if (!def.isArray) return base;
  return base.includes('|') ? `(${base})[]` : `${base}[]`;
}

function generateTableTypes(table: sql.TableDeclaration): string {
  const pascalName = toPascalCase(table.name_);
  const recordLines: string[] = [];
  const rowLines: string[] = [];
  const metaFields: string[] = [];

  const pks = Object.keys(table.primary || {});
  const pkField = pks[0] || Object.keys(table.record)[0];
  const pkCol = sql.toSnake(pkField);
  const pkDef = sql.migration.normalizeField(table.record[pkField]);
  const pkTsType = formatTsType(pkDef);

  for (const [fieldName, fieldDef] of Object.entries(table.record)) {
    const def = sql.migration.normalizeField(fieldDef);
    const colName = sql.toSnake(fieldName);
    const tsType = formatTsType(def);
    const nullSuffix = def.nullable ? ' | null' : '';
    const optionalOnCreate = def.nullable || def.sqlDefault !== null ? '?' : '';

    recordLines.push(`    ${fieldName}${optionalOnCreate}: ${tsType}${nullSuffix};`);
    rowLines.push(`    ${colName}: ${tsType}${nullSuffix};`);
    metaFields.push(
      `        ${fieldName}: { col: '${colName}', type: '${def.type}', isArray: ${def.isArray}, maxLength: ${def.length}, nullable: ${def.nullable}, hasDefault: ${def.sqlDefault !== null} }`,
    );
  }

  return `
// ============================================================================
// Entity: ${table.title} (table: "${table.name_}")
// ============================================================================

export interface ${pascalName}Props {
${recordLines.join('\n')}
}

export interface ${pascalName}Row {
${rowLines.join('\n')}
}

export const ${pascalName}Meta = {
    tableName: '${table.name_}',
    pkField: '${pkField}' as keyof ${pascalName}Props,
    pkCol: '${pkCol}',
    fields: {
${metaFields.join(',\n')}
    }
} as const;

export type ${pascalName}Entity = EntityProxy<${pascalName}Props, ${pascalName}Row>;

export function create${pascalName}Entity(
    initial: ${pascalName}Props | ${pascalName}Row,
    options?: { isFromDb?: boolean; db?: DbExecutor }
): ${pascalName}Entity {
    return createEntityProxy<${pascalName}Props, ${pascalName}Row>(${pascalName}Meta as any, initial, options);
}

export type ${pascalName}Repository = EntityRepository<${pascalName}Props, ${pascalName}Row, ${pkTsType}>;
`;
}

/** Генерирует полный код файла entities.ts */
export function generateEntitiesFile(outputPath: string, tables: Record<string, sql.TableDeclaration>): void {
  const blocks: string[] = [];

  blocks.push(`/* eslint-disable */
// ⚠️ АВТОГЕНЕРИРУЕМЫЙ ФАЙЛ ИЗ schema.ts. НЕ РЕДАКТИРОВАТЬ ВРУЧНУЮ!

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
    $toJSON(): Required<TProps>;
    $commit(freshRow?: Partial<TRow>): void;
    $toInsertSQL(): SqlQuery;
    $toUpdateSQL(): SqlQuery | null;
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

    const resolveDb = (explicitDb?: DbExecutor): DbExecutor => {
        const target = explicitDb || boundDb;
        if (!target) {
            throw new Error(\`[\${meta.tableName}] БД не привязана! Передай pg.Pool в createDbContext(pool) или в метод .$save(pool)\`);
        }
        return target;
    };

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
        $toJSON() {
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
        $toInsertSQL(): SqlQuery {
            const cols: string[] = [];
            const placeholders: string[] = [];
            const values: unknown[] = [];

            for (const fMeta of Object.values(meta.fields)) {
                const val = rowData[fMeta.col];
                if (val === null && fMeta.hasDefault) continue;
                cols.push(fMeta.col);
                values.push(val);
                placeholders.push(\`$\${values.length}\`);
            }

            return {
                sql: \`INSERT INTO \${meta.tableName} (\${cols.join(', ')}) VALUES (\${placeholders.join(', ')}) RETURNING *;\`,
                values,
            };
        },
        $toUpdateSQL(): SqlQuery | null {
            if (dirtyCols.size === 0) return null;

            const sets: string[] = [];
            const values: unknown[] = [];

            for (const col of dirtyCols) {
                if (col === meta.pkCol) continue;
                values.push(rowData[col]);
                sets.push(\`\${col} = $\${values.length}\`);
            }

            if (sets.length === 0) return null;

            values.push(rowData[meta.pkCol]);
            const pkParam = \`$\${values.length}\`;

            return {
                sql: \`UPDATE \${meta.tableName} SET \${sets.join(', ')} WHERE \${meta.pkCol} = \${pkParam} RETURNING *;\`,
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
                const { sql, values } = methods.$toInsertSQL();
                const res = await db.query<TRow>(sql, values);
                methods.$commit(res.rows[0]);
                return proxyInstance;
            }

            const updateQuery = methods.$toUpdateSQL();
            if (!updateQuery) return proxyInstance; // Ничего не менялось — запрос в БД не делаем!

            const res = await db.query<TRow>(updateQuery.sql, updateQuery.values);
            methods.$commit(res.rows[0]);
            return proxyInstance;
        },
        async $delete(explicitDb?: DbExecutor) {
            const db = resolveDb(explicitDb);
            const pkVal = rowData[meta.pkCol];
            const res = await db.query(\`DELETE FROM \${meta.tableName} WHERE \${meta.pkCol} = $1;\`, [pkVal]);
            return (res.rowCount ?? 0) > 0;
        },
        async $reload(explicitDb?: DbExecutor) {
            const db = resolveDb(explicitDb);
            const pkVal = rowData[meta.pkCol];
            const res = await db.query<TRow>(\`SELECT * FROM \${meta.tableName} WHERE \${meta.pkCol} = $1 LIMIT 1;\`, [pkVal]);
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
                throw new Error(\`[\${meta.tableName}] Неизвестное свойство "\${prop}"\`);
            }

            if (newValue === null || newValue === undefined) {
                if (!fMeta.nullable) {
                    throw new Error(\`[\${meta.tableName}.\${prop}] Поле NOT NULL не может быть null\`);
                }
                newValue = null;
            } else if ((fMeta.type === 'String' || fMeta.type === 'Char') && !fMeta.isArray && typeof newValue === 'string') {
                if (fMeta.maxLength > 0 && newValue.length > fMeta.maxLength) {
                    throw new Error(\`[\${meta.tableName}.\${prop}] Длина \${newValue.length} превышает лимит \${fMeta.maxLength}\`);
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
        const sql = \`SELECT * FROM \${this.meta.tableName} WHERE \${this.meta.pkCol} = $1 LIMIT 1;\`;
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
                    clauses.push(\`\${col} IS NULL\`);
                } else {
                    values.push(val);
                    clauses.push(\`\${col} = $\${values.length}\`);
                }
            }
        }

        const whereSql = clauses.length > 0 ? \`WHERE \${clauses.join(' AND ')}\` : '';
        const sql = \`SELECT * FROM \${this.meta.tableName} \${whereSql} LIMIT \${Number(limit)};\`;
        const res = await this.db.query<TRow>(sql, values);

        return res.rows.map((row) =>
            createEntityProxy<TProps, TRow>(this.meta, row, { isFromDb: true, db: this.db })
        );
    }

    /** Удаление по Primary Key */
    async deleteByPk(pk: TPk): Promise<boolean> {
        const sql = \`DELETE FROM \${this.meta.tableName} WHERE \${this.meta.pkCol} = $1;\`;
        const res = await this.db.query(sql, [pk]);
        return (res.rowCount ?? 0) > 0;
    }
}
`);

  for (const table of Object.values(tables)) {
    blocks.push(generateTableTypes(table));
  }

  // Генерируем DI-контейнер createDbContext(pgPool)
  const contextProps = Object.values(tables).map(
    (t) =>
      `        ${t.name_}: new EntityRepository<${toPascalCase(t.name_)}Props, ${toPascalCase(t.name_)}Row>(${toPascalCase(t.name_)}Meta as any, db),`,
  );

  blocks.push(`
// ============================================================================
// DI Context Factory (Внедрение pg.Pool / pg.Client / Transaction)
// ============================================================================

/**
 * Создает контекст БД с репозиториями для всех таблиц.
 * Сюда можно передать pg.Pool, pg.Client или транзакционный клиент!
 */
export function createDbContext(db: DbExecutor) {
    return {
        $executor: db,
${contextProps.join('\n')}
        /** Выполнить операции внутри транзакции (использует пул из контекста или явно переданный пул) */
        async $transaction<T>(
            fnOrPool: ((txCtx: ReturnType<typeof createDbContext>) => Promise<T>) | { connect(): Promise<DbExecutor & { release(): void }> },
            maybeFn?: (txCtx: ReturnType<typeof createDbContext>) => Promise<T>
        ): Promise<T> {
            const isFnFirst = typeof fnOrPool === 'function';
            const pool = isFnFirst ? db : fnOrPool;
            const fn = isFnFirst ? fnOrPool : maybeFn!;

            if (!pool || typeof pool.connect !== 'function') {
                throw new Error('Для вызова $transaction необходим pg.Pool с методом .connect()');
            }

            const client = await pool.connect();
            try {
                await client.query('BEGIN');
                const txCtx = createDbContext(client);
                const result = await fn(txCtx);
                await client.query('COMMIT');
                return result;
            } catch (err) {
                await client.query('ROLLBACK');
                throw err;
            } finally {
                client.release();
            }
        }
    };
}

export type DbContext = ReturnType<typeof createDbContext>;
`);

  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(outputPath, blocks.join('\n'), 'utf-8');

  console.log(`🧬 Сгенерированы TypeScript Proxy-сущности и DI-контейнер: ${outputPath}`);
}
