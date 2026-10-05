import * as abstracts from "@razomy/abstracts";

export interface IHasRef extends abstracts.meta.IResource {
}

export type IdRef<T extends abstracts.patterns.HasId = abstracts.patterns.HasId> = abstracts.patterns.HasId & T;

// S shared keys
export type OneOfIdRef<T extends abstracts.patterns.HasId = abstracts.patterns.HasId, S extends abstracts.patterns.HasId = abstracts.patterns.HasId> = T extends any
  ? IdRef<T & S>
  : never;

export type IdRefArray<T extends abstracts.patterns.HasId = abstracts.patterns.HasId, S extends abstracts.patterns.HasId = abstracts.patterns.HasId> = OneOfIdRef<T, S>[];
