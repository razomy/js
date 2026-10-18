import * as abstractions from "@razomy/abstractions";
// space
export interface IContext extends abstractions.patterns.IInformation, abstractions.patterns.HasId {
}

export type IModule = abstractions.patterns.IContext

// instruction of space creation
export interface IPipeline extends abstractions.patterns.IInformation, abstractions.patterns.HasId {
}

export type Context<T extends IContext = IContext> = IContext & abstractions.patterns.IdRef<T>;

export type ContextKey = keyof Omit<Context, string | number | symbol>;

export interface HasC<C extends Context> {
  c: C;
}
