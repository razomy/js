import * as abstractions from "@razomy/abstractions";

export type Vrd<T> = abstractions.structures.RecursiveDict<VrdOrValue<T>>;
export type VrdOrValue<T> = Vrd<T> | T;
