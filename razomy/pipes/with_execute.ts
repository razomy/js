import {Execute} from 'razomy.pipes/execute';

export interface WithExecute<I, O> {
  execute: Execute<I, O>
}
