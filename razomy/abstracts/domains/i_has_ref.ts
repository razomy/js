import type {IResource, IContext, HasId} from "@razomy/abstracts/domains";

export interface IHasRef extends IResource {
}

export type IdRef<T extends IContext = IContext> = HasId & T;

// S shared keys
export type OneOfIdRef<T extends IContext = IContext, S extends IContext = IContext> = T extends any
  ? IdRef<T & S>
  : never;

export type IdRefArray<T extends IContext = IContext, S extends IContext = IContext> = OneOfIdRef<T, S>[];
