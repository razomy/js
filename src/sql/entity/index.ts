// Imports
import { EntityRepository, createEntityProxy } from './entity_repository';
import type { DbExecutor, EntityComponentMethods, EntityDataType, EntityProxy, FieldMeta, SqlQuery, TableMeta } from './entity_repository';
import { generateEntitiesFile } from './generate_entities_file';

// Named exports
export {
  EntityRepository,
  createEntityProxy,
  generateEntitiesFile
};
export type {
  DbExecutor,
  EntityComponentMethods,
  EntityDataType,
  EntityProxy,
  FieldMeta,
  SqlQuery,
  TableMeta
};

// Default export
const entity = {
  EntityRepository,
  createEntityProxy,
  generateEntitiesFile,
};


export default entity;
