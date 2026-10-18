import * as abstractions from "@razomy/abstractions";

export type Vrd<T> = abstractions.structure.RecursiveDict<VrdOrValue<T>>;
export type VrdOrValue<T> = Vrd<T> | T;
