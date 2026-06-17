import * as abstracts from "@razomy/abstracts";

export interface IHasRef extends abstracts.domains.IResource {
}

export type IdRef<T extends abstracts.domains.IContext = abstracts.domains.IContext> = abstracts.domains.HasId & T;
