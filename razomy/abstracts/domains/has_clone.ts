import * as abstracts from "@razomy/abstracts";

export interface HasClone extends abstracts.meta.IHas {
  clone(): this;
}
