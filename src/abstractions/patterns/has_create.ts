import * as abstractions from "@razomy/abstractions";

export interface HasCreate<T> extends abstractions.meta.IHas {
  create(args?: any): T;
}
