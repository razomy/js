import * as abstracts from '@razomy/abstracts';

export type Execute<I extends any[], O> = abstracts.functions.Call<I, O>;

export interface WithExecute<I extends any[], O> {
  execute: Execute<I, O>;
}
