import * as abstracts from "@razomy/abstracts";

export type EntityId<EntityName extends string, Type = string> = abstracts.meta.Brand<Type, EntityName>;

// join has
export interface IEntity extends abstracts.domains.IContext {
}
