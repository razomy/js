import * as abstracts from "@razomy/abstracts";

export type Encode<D, E> = (data: D) => E;

export interface HasEncode<D, E> extends abstracts.meta.IHas {
  encode(data: D): E;
}
