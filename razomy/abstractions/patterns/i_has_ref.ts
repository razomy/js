import * as abstractions from "@razomy/abstractions";

export interface IHasRef extends abstractions.meta.IResource {
}

export type IdRef<T extends abstractions.patterns.HasId = abstractions.patterns.HasId> = abstractions.patterns.HasId & T;

// S shared keys
export type OneOfIdRef<T extends abstractions.patterns.HasId = abstractions.patterns.HasId, S extends abstractions.patterns.HasId = abstractions.patterns.HasId> = T extends any
  ? IdRef<T & S>
  : never;

export type IdRefArray<T extends abstractions.patterns.HasId = abstractions.patterns.HasId, S extends abstractions.patterns.HasId = abstractions.patterns.HasId> = OneOfIdRef<T, S>[];
