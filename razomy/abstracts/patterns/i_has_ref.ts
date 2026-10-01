import * as abstracts from "@razomy/abstracts";

export interface IHasRef extends abstracts.meta.IResource {
}

export type IdRef<T extends abstracts.patterns.IContext = abstracts.patterns.IContext> = abstracts.patterns.HasId & T;

// S shared keys
export type OneOfIdRef<T extends abstracts.patterns.IContext = abstracts.patterns.IContext, S extends abstracts.patterns.IContext = abstracts.patterns.IContext> = T extends any
  ? IdRef<T & S>
  : never;

export type IdRefArray<T extends abstracts.patterns.IContext = abstracts.patterns.IContext, S extends abstracts.patterns.IContext = abstracts.patterns.IContext> = OneOfIdRef<T, S>[];
