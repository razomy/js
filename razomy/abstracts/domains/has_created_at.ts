import * as abstracts from "@razomy/abstracts";

export type DateTime = Date;

export interface HasCreatedAt extends abstracts.meta.IHas {
  /**
   * @default createdAt()
   */
  createdAt: DateTime;
}

export interface HasUpdatedAt extends abstracts.meta.IHas {
  /**
   * @default updatedAt()
   */
  updatedAt: DateTime;
}

export interface HasDeletedAt extends abstracts.meta.IHas {
  deletedAt: DateTime | null;
}

export interface CudDateTime extends HasCreatedAt, HasUpdatedAt, HasDeletedAt{
}
