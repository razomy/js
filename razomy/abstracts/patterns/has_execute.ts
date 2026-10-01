import * as abstracts from '@razomy/abstracts';

export type Execute<TA extends any[], TR> = abstracts.functions.Function<TA, TR>;

export interface HasExecute<TA extends any[], TR = Promise<void>> extends abstracts.meta.IHas {
  execute: Execute<TA, TR>;
}

export interface HasCancel<TA extends any[], TR = Promise<void>> {
  cancel: abstracts.patterns.Execute<TA, TR>;
}

export interface HasRollback<TA extends any[], TR = Promise<void>> {
  rollback: abstracts.patterns.Execute<TA, TR>;
}

export interface HasValidate<TA extends any[], TR = Promise<void>> {
  validate: abstracts.patterns.Execute<TA, TR>;
}

