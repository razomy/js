import {WithExecute as WithExecute_} from "razomy.js/pipes/with_execute";
import {Execute} from "razomy.js/pipes/booleans/execute";

export interface WithExecute<I> extends WithExecute_<I, boolean>{
  execute: Execute<I>
}
