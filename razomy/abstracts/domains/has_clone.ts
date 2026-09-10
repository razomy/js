import * as abstracts from "@razomy/abstracts";

export interface HasClone extends abstracts.domains.IHas {
  clone(): this;
}
