import * as abstractions from '@razomy/abstractions';

export type DateTime = Date;

export interface HasCreatedAt extends abstractions.patterns.IComponent {
  /**
   * @default createdAt()
   */
  createdAt: DateTime;
}

export interface HasUpdatedAt extends abstractions.patterns.IComponent {
  /**
   * @default updatedAt()
   */
  updatedAt: DateTime;
}

export interface HasDeletedAt extends abstractions.patterns.IComponent {
  deletedAt: DateTime | null;
}

export interface HasReadAt extends abstractions.patterns.IComponent {
  readAt: DateTime | null;
}

export interface CudDateTime extends HasCreatedAt, HasUpdatedAt, HasDeletedAt {}

export interface CrudDateTime extends HasCreatedAt, HasUpdatedAt, HasDeletedAt, HasReadAt {}
