import {WithExecute as WithExecute_} from 'razomy.pipes';
import {Execute} from 'razomy.pipes.booleans';

export interface WithExecute<I> extends WithExecute_<I, boolean> {
  execute: Execute<I>
}
