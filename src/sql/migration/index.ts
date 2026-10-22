// Imports
import { buildCreateTableSql } from './build_create_table_sql';
import { generateInitialMigrations } from './generate_initial_migrations';
import { TYPE_MAP, getTargetStateFromSchema } from './get_target_state_from_schema';
import type { ColumnState, NormalizedColumn, TableState } from './get_target_state_from_schema';
import { getUpFiles } from './get_up_files';
import { normalizeField } from './normalize_field';
import { replayMigrationsState } from './replay_migrations_state';
import { validateSymmetry } from './validate_symmetry';
import { verifyMigrations } from './verify_migrations';

// Named exports
export {
  TYPE_MAP,
  buildCreateTableSql,
  generateInitialMigrations,
  getTargetStateFromSchema,
  getUpFiles,
  normalizeField,
  replayMigrationsState,
  validateSymmetry,
  verifyMigrations
};
export type {
  ColumnState,
  NormalizedColumn,
  TableState
};

// Default export
const migration = {
  buildCreateTableSql,
  generateInitialMigrations,
  TYPE_MAP,
  getTargetStateFromSchema,
  getUpFiles,
  normalizeField,
  replayMigrationsState,
  validateSymmetry,
  verifyMigrations,
};


export default migration;
