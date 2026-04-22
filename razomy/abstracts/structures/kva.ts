import * as abstracts from "@razomy/abstracts";

export type Key<T = string> = T;


export type KeyValue<KT, VT> = [Key<KT>, KvaOrValue<KT, VT>];
export type KeyValueArray<KT, VT> = KeyValue<KT, VT>[];

export type KvaOrValue<KT, VT> = KeyValueArray<KT, VT> | abstracts.structures.Value<VT>;
