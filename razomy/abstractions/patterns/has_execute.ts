import * as abstractions from '@razomy/abstractions';

export type Execute<TA extends any[], TR> = abstractions.functions.Function<TA, TR>;

export interface HasExecute<TA extends any[], TR = Promise<void>> extends abstractions.meta.IHas {
  execute: Execute<TA, TR>;
}

export interface HasCancel<TA extends any[], TR = Promise<void>> {
  cancel: abstractions.patterns.Execute<TA, TR>;
}

export interface HasRollback<TA extends any[], TR = Promise<void>> {
  rollback: abstractions.patterns.Execute<TA, TR>;
}

export interface HasValidate<TA extends any[], TR = Promise<void>> {
  validate: abstractions.patterns.Execute<TA, TR>;
}

