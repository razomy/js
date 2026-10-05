import * as abstracts from '@razomy/abstracts';

export type DateTime = Date;

export interface HasCreatedAt extends abstracts.patterns.IComponent {
  /**
   * @default createdAt()
   */
  createdAt: DateTime;
}

export interface HasUpdatedAt extends abstracts.patterns.IComponent {
  /**
   * @default updatedAt()
   */
  updatedAt: DateTime;
}

export interface HasDeletedAt extends abstracts.patterns.IComponent {
  deletedAt: DateTime | null;
}

export interface HasReadAt extends abstracts.patterns.IComponent {
  readAt: DateTime | null;
}

export interface CudDateTime extends HasCreatedAt, HasUpdatedAt, HasDeletedAt {}

export interface CrudDateTime extends HasCreatedAt, HasUpdatedAt, HasDeletedAt, HasReadAt {}
