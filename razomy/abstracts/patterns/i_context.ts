import * as abstracts from "@razomy/abstracts";
// space
export interface IContext extends abstracts.patterns.IInformation, abstracts.patterns.HasId {
}

export type IModule = abstracts.patterns.IContext

// instruction of space creation
export interface IPipeline extends abstracts.patterns.IInformation, abstracts.patterns.HasId {
}

export type Context<T extends IContext = IContext> = IContext & abstracts.patterns.IdRef<T>;

export type ContextKey = keyof Omit<Context, string | number | symbol>;

export interface HasC<C extends Context> {
  c: C;
}
