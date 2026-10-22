import * as sql from "@razomy/sql";

// --- START OF FILE validator.ts ---

export interface ColumnState {
  sqlType: string;
  notNull: boolean;
  isPk: boolean;
  defaultVal: string | null;
}

export interface TableState {
  columns: Record<string, ColumnState>;
  indexes: Map<string, string>; // indexName -> columnName
}

export interface NormalizedColumn extends Required<Omit<sql.ColumnConfig, 'migrateFrom' | 'transformSql'>> {
  sqlType: string;
  sqlDefault: string | null;
  migrateFrom?: string | undefined;
  transformSql?: string | undefined;
}

export const TYPE_MAP: Record<sql.DataType, (cfg?: sql.ColumnConfig) => string> = {
  String: (cfg) => `VARCHAR(${cfg?.length ?? 255})`,
  Char: (cfg) => `CHAR(${cfg?.length ?? 2})`,
  Text: () => 'TEXT',

  SmallInt: () => 'SMALLINT',
  Int: () => 'INTEGER',
  BigInt: () => 'BIGINT',
  Decimal: (cfg) => `NUMERIC(${cfg?.precision ?? 12}, ${cfg?.scale ?? 2})`,
  Float: () => 'REAL',
  Double: () => 'DOUBLE PRECISION',

  Bool: () => 'BOOLEAN',

  Date: () => 'DATE',
  Time: () => 'TIME WITHOUT TIME ZONE',
  Timestamp: () => 'TIMESTAMP WITHOUT TIME ZONE',
  Timestamptz: () => 'TIMESTAMP WITH TIME ZONE',

  Uuid: () => 'UUID',
  Jsonb: () => 'JSONB',
  Bytea: () => 'BYTEA',
  Inet: () => 'INET',
};

/** Собирает целевое состояние из schema.ts */
export function getTargetStateFromSchema(tables: Record<string, sql.TableDeclaration>): Record<string, TableState> {
  const state: Record<string, TableState> = {};

  for (const table of Object.values(tables)) {
    const pks = Object.keys(table.primary || {});
    const columns: Record<string, ColumnState> = {};

    for (const [fieldName, fieldDef] of Object.entries(table.record)) {
      const def = sql.migration.normalizeField(fieldDef);
      const colName = sql.toSnake(fieldName);
      const isPk = pks.length === 1 && pks[0] === fieldName;

      columns[colName] = {
        sqlType: def.sqlType,
        notNull: isPk || !def.nullable,
        isPk,
        defaultVal: def.sqlDefault,
      };
    }

    const indexes = new Map<string, string>();
    for (const idxField of Object.keys(table.index || {})) {
      const col = sql.toSnake(idxField);
      indexes.set(`idx_${table.name_}_${col}`, col);
    }

    state[table.name_] = { columns, indexes };
  }
  return state;
}

