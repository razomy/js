// --- START OF FILE normalize_field.ts ---

import * as sql from '@razomy/sql';

const defaultMap: Record<string, string> = {
  now: 'CURRENT_TIMESTAMP',
  'now()': 'CURRENT_TIMESTAMP',
  current_timestamp: 'CURRENT_TIMESTAMP',
  'gen_random_uuid()': 'gen_random_uuid()',
  'uuid_generate_v4()': 'uuid_generate_v4()',
  true: 'TRUE',
  false: 'FALSE',
};

function formatSqlDefault(rawDef: unknown): string | null {
  if (rawDef === undefined || rawDef === null || rawDef === '') return null;

  if (typeof rawDef === 'boolean') {
    return rawDef ? 'TRUE' : 'FALSE';
  }
  if (typeof rawDef === 'number') {
    return String(rawDef);
  }
  if (typeof rawDef === 'object') {
    return `'${JSON.stringify(rawDef).replace(/'/g, "''")}'`;
  }

  const str = String(rawDef);
  const lower = str.toLowerCase();
  if (defaultMap[lower]) {
    return defaultMap[lower];
  }

  return `'${str.replace(/'/g, "''")}'`;
}

export function normalizeField(def: sql.FieldDef): sql.migration.NormalizedColumn {
  const obj = typeof def === 'string' ? { type: def } : def;
  const length = obj.length ?? (obj.type === 'String' ? 255 : 0);
  const rawDef = obj.default_ ?? '';
  const sqlDefault = formatSqlDefault(obj.default_);

  const baseSqlType = sql.migration.TYPE_MAP[obj.type](obj);
  const sqlType = obj.isArray ? `${baseSqlType}[]` : baseSqlType;

  return {
    type: obj.type,
    scale: obj.scale ?? 0,
    isArray: obj.isArray ?? false,
    unique: obj.unique ?? false,
    autoIncrement: obj.autoIncrement ?? false,
    references: obj.references,
    precision: obj.precision ?? 0,
    length,
    nullable: obj.nullable ?? false,
    default_: rawDef,
    sqlType,
    sqlDefault,
    migrateFrom: obj.migrateFrom ? sql.toSnake(obj.migrateFrom) : undefined,
    transformSql: obj.transformSql,
  };
}
