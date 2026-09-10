import * as abstracts from "@razomy/abstracts";

export type Id = string;

export interface HasId extends abstracts.domains.IHas {
  id: Id;
}
