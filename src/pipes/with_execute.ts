import {Execute} from "razomy.js/pipes/execute";

export interface WithExecute<I, O> {
  execute: Execute<I, O>
}
