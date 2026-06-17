/**
 * БАЗОВЫЕ ТИПЫ ДЛЯ МЕТАДАННЫХ
 */
type IndexType = 'Btree' | 'Gin' | 'Hash';
type SortOrder = 'ASC' | 'DESC';

interface IndexDefinition {
  fields: string[];
  type: IndexType;
  order: SortOrder;
}

export interface ModelMetadata {
  schema: string;
  onCreate: any;
  onDelete: any;
  onUpdate: any;
  uniqueConstraints: Record<string, string[]>;
  indexes: Record<string, IndexDefinition>;
}

export enum EntityType {
  EDGE = 'EDGE',
  ACL_ACCESS_POLICY = 'ACL_ACCESS_POLICY',
  USER = 'USER',
  FS_NODE = 'FS_NODE',
  EVENT_LOG = 'EVENT_LOG',
  AUTH_PROVIDER = 'AUTH_PROVIDER',
  AUTH_SESSION = 'AUTH_SESSION',
}
