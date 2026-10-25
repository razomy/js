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

export const ${pascalName.constantCase()}_META = {
    tableName: '${table.name_}',
    pkField: '${pkField}' as keyof ${pascalName}Props,
    pkCol: '${pkCol}',
    fields: {
${metaFields.join(',\n')}
    }
} as const;

export type ${pascalName}Entity = sql.entity.EntityProxy<${pascalName}Props, ${pascalName}Row>;

export type ${pascalName}Repository = sql.entity.EntityRepository<${pascalName}Props, ${pascalName}Row, ${pkTsType}>;
`;
}

/** Генерирует полный код файла entities.ts */
export function generateEntitiesFile(outputPath: string, tables: Record<string, sql.TableDeclaration>): void {
  const blocks: string[] = [];

  blocks.push(`/* eslint-disable */
// ⚠️ АВТОГЕНЕРИРУЕМЫЙ ФАЙЛ ИЗ schema.ts. НЕ РЕДАКТИРОВАТЬ ВРУЧНУЮ!
import * as sql from "@razomy/sql";
`);

  for (const table of Object.values(tables)) {
    blocks.push(generateTableTypes(table));
  }

  // Генерируем DI-контейнер createDbContext(pgPool)
  const contextProps = Object.values(tables).map(
    (t) =>
      `        ${t.name_}: new sql.entity.EntityRepository<${toPascalCase(t.name_)}Props, ${toPascalCase(t.name_)}Row>(${t.name_.constantCase()}_META as any, db),`,
  );

  blocks.push(`
// ============================================================================
// DI Context Factory (Внедрение pg.Pool / pg.Client / Transaction)
// ============================================================================

/**
 * Создает контекст БД с репозиториями для всех таблиц.
 * Сюда можно передать pg.Pool, pg.Client или транзакционный клиент!
 */
export function createDbContext(db: sql.entity.DbExecutor) {
    return {
        $executor: db,
${contextProps.join('\n')}
        /** Выполнить операции внутри транзакции (использует пул из контекста или явно переданный пул) */
        async $transaction<T>(
            fnOrPool: ((txCtx: ReturnType<typeof createDbContext>) => Promise<T>) | { connect(): Promise<sql.entity.DbExecutor & { release(): void }> },
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
