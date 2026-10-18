import * as abstractions from '@razomy/abstractions';

export interface HasCreatedAt extends abstractions.patterns.IComponent {
  /**
   * @default createdAt()
   */
  createdAt: abstractions.time.DateTime;
}

export interface HasUpdatedAt extends abstractions.patterns.IComponent {
  /**
   * @default updatedAt()
   */
  updatedAt: abstractions.time.DateTime;
}

export interface HasDeletedAt extends abstractions.patterns.IComponent {
  deletedAt: abstractions.time.DateTime | null;
}

export interface HasReadAt extends abstractions.patterns.IComponent {
  readAt: abstractions.time.DateTime | null;
}

export interface CudDateTime extends HasCreatedAt, HasUpdatedAt, HasDeletedAt {}

export interface CrudDateTime extends HasCreatedAt, HasUpdatedAt, HasDeletedAt, HasReadAt {}
