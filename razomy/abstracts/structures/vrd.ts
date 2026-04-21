import type {RecursiveDict} from "./dict";

export type Vrd<T> = RecursiveDict<VrdOrValue<T>>;
export type VrdOrValue<T> = Vrd<T> | T;
