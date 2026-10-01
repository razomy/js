import * as abstracts from "@razomy/abstracts";

export interface IContext extends abstracts.meta.IResource {
}

export type Context<T extends IContext = IContext> = IContext & abstracts.patterns.IdRef<T>;

export type ContextKey = keyof Omit<Context, string | number | symbol>;

export interface HasC<C extends Context> {
  c: C;
}

// join functions
export interface IModule extends abstracts.patterns.IContext {
}

// join functions with cache
export interface IController extends abstracts.patterns.IContext {
}

export interface IMachine extends abstracts.patterns.IContext {
}

export interface HasContextCollection extends  abstracts.meta.IHas {
  set<T extends abstracts.patterns.IdRef>(ctx: T): void;

  remove(id: abstracts.patterns.Id): void;

  get<T extends abstracts.patterns.IdRef>(id: abstracts.patterns.Id): T;

  setKey<K extends string, V >(id: abstracts.patterns.Id, key: K, value: V): void;

  getKey<K extends string, V >(id: abstracts.patterns.Id, Key: K): V;
}

export type DatabaseController = abstracts.patterns.IController & HasContextCollection

export interface  HasDatabaseControllerRef extends abstracts.patterns.IHasRef {
  databaseController: abstracts.patterns.IdRef<DatabaseController>
}
