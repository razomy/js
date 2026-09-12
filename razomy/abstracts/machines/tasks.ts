import * as abstracts from "@razomy/abstracts";

export interface HasCancel<TA extends any[], TR = Promise<void>> {
  cancel: abstracts.patterns.Execute<TA, TR>;
}

export interface HasRollback<TA extends any[], TR = Promise<void>> {
  rollback: abstracts.patterns.Execute<TA, TR>;
}

export interface HasValidate<TA extends any[], TR = Promise<void>> {
  validate: abstracts.patterns.Execute<TA, TR>;
}

export interface IEvent extends abstracts.domains.Context {
  kind: string;
}
