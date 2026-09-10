import * as abstracts from "@razomy/abstracts";
import type {IdRef} from "./i_has_ref";

export interface IContext extends abstracts.domains.IResource {
}

export type Context<T extends IContext = IContext> = IContext & IdRef<T>;

export type ContextKey = keyof Omit<Context, string | number | symbol>;
