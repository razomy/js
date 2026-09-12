import * as abstracts from '@razomy/abstracts';

export type Execute<TA extends any[], TR> = abstracts.functions.Function<TA, TR>;

export interface HasExecute<TA extends any[], TR = Promise<void>> extends abstracts.meta.IHas {
  execute: Execute<TA, TR>;
}
