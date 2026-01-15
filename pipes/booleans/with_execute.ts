import {WithExecute as WithExecute_} from 'razomy.pipes/with_execute';
import {Execute} from 'razomy.pipes/booleans/execute';

export interface WithExecute<I> extends WithExecute_<I, boolean>{
  execute: Execute<I>
}
