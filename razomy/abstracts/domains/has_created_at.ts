import * as abstracts from "@razomy/abstracts";

export interface HasCreatedAt extends abstracts.meta.IHas {
  createdAt: Date;
}

export interface HasUpdatedAt extends abstracts.meta.IHas {
  updatedAt: Date;
}

export interface HasDeletedAt extends abstracts.meta.IHas {
  deletedAt: Date;
}
