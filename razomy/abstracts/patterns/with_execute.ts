import * as function_ from "@razomy/function";

export type Execute<I extends any[], O> = function_.Function<I, O>;

export interface WithExecute<I extends any[], O> {
  execute: Execute<I, O>;
}
