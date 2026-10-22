// Imports
import { BIGINT, BOOL, CHAR_2, CHAR_3, DATE, DECIMAL, DOUBLE, INT, JSONB, SMALLINT, STRING_128, STRING_16, STRING_255, STRING_32, STRING_64, STRING_ARRAY, TEXT, TEXT_ARRAY, TIMESTAMP, UUID_PK, defineTable } from './define_table';
import type { ColumnConfig, DataType, FieldDef, TableDeclaration } from './define_table';
import * as entity from './entity';
import { i18N } from './i_18_n';
import * as migration from './migration';
import { toSnake } from './to_snake';

// Named exports
export {
  BIGINT,
  BOOL,
  CHAR_2,
  CHAR_3,
  DATE,
  DECIMAL,
  DOUBLE,
  INT,
  JSONB,
  SMALLINT,
  STRING_128,
  STRING_16,
  STRING_255,
  STRING_32,
  STRING_64,
  STRING_ARRAY,
  TEXT,
  TEXT_ARRAY,
  TIMESTAMP,
  UUID_PK,
  defineTable,
  entity,
  i18N,
  migration,
  toSnake
};
export type {
  ColumnConfig,
  DataType,
  FieldDef,
  TableDeclaration
};

// Default export
const sql = {
  BIGINT,
  BOOL,
  CHAR_2,
  CHAR_3,
  DATE,
  DECIMAL,
  DOUBLE,
  INT,
  JSONB,
  SMALLINT,
  STRING_128,
  STRING_16,
  STRING_255,
  STRING_32,
  STRING_64,
  STRING_ARRAY,
  TEXT,
  TEXT_ARRAY,
  TIMESTAMP,
  UUID_PK,
  defineTable,
  entity,
  i18N,
  migration,
  toSnake,
};


export default sql;
