import * as abstracts from "@razomy/abstracts";

export interface HasFunctionHir extends abstracts.meta.IHas {
  functionHir: abstracts.translators.FunctionHir;
}

export type CallEntity<A extends abstracts.functions.CallArs = abstracts.functions.CallArs> = abstracts.domains.IEntity & HasFunctionHir & abstracts.functions.HasCall<A>
export type CallRef<A extends abstracts.functions.CallArs = abstracts.functions.CallArs> = abstracts.domains.IdRef<CallEntity<A>>


// join functions
export interface IModule extends abstracts.domains.IContext {
}

// join functions with cache
export interface IController extends abstracts.domains.IContext {
}

export interface IMachine extends abstracts.domains.IContext {
}

