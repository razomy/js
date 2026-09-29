import * as abstracts from "@razomy/abstracts";

export interface HasCreate<T> extends abstracts.meta.IHas {
  create(args?: any): T;
}
