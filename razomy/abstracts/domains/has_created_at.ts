import * as abstracts from "@razomy/abstracts";

export interface HasCreatedAt extends abstracts.domains.IHas {
  createdAt: Date;
}

export interface HasUpdatedAt extends abstracts.domains.IHas {
  updatedAt: Date;
}

export interface HasDeletedAt extends abstracts.domains.IHas {
  deletedAt: Date;
}
