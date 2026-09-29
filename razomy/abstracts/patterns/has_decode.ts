import * as abstracts from "@razomy/abstracts";

export type Decode<E, D> = (encoded: E) => D;

export interface HasDecode<E, D>  extends abstracts.meta.IHas{
  decode(encoded: E): D;
}
