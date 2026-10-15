import * as abstractions from "@razomy/abstractions";

export interface HasClone extends abstractions.meta.IHas {
  clone(): this;
}
