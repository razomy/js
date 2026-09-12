import * as abstracts from "@razomy/abstracts";

export interface IContext extends abstracts.meta.IResource {
}

export type Context<T extends IContext = IContext> = IContext & abstracts.domains.IdRef<T>;

export type ContextKey = keyof Omit<Context, string | number | symbol>;

export interface HasC<C extends Context> {
  c: C;
}
