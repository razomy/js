import * as abstracts from "@razomy/abstracts";

export interface IHasRef extends abstracts.meta.IResource {
}

export type IdRef<T extends abstracts.domains.IContext = abstracts.domains.IContext> = abstracts.domains.HasId & T;

// S shared keys
export type OneOfIdRef<T extends abstracts.domains.IContext = abstracts.domains.IContext, S extends abstracts.domains.IContext = abstracts.domains.IContext> = T extends any
  ? IdRef<T & S>
  : never;

export type IdRefArray<T extends abstracts.domains.IContext = abstracts.domains.IContext, S extends abstracts.domains.IContext = abstracts.domains.IContext> = OneOfIdRef<T, S>[];
