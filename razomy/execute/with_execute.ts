import {Function} from 'razomy.function';

export type Execute<I extends any[], O> = Function<I, O>

export interface WithExecute<I extends any[], O> {
  execute: Execute<I, O>
}
