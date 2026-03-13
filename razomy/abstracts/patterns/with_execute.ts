import type { Callable } from '../functions';

export type Execute<I extends any[], O> = Callable<I, O>;

export interface WithExecute<I extends any[], O> {
  execute: Execute<I, O>;
}
