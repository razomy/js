import {Execute} from 'razomy.pipes';

export interface WithExecute<I, O> {
  execute: Execute<I, O>
}
