import * as abstracts from "@razomy/abstracts";

export type Vrd<T> = abstracts.structures.RecursiveDict<VrdOrValue<T>>;
export type VrdOrValue<T> = Vrd<T> | T;
