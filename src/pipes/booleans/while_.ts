import {Execute} from 'razomy.pipes/booleans/execute';

export function while_<T>(ctx: T, next: Execute<T>) {
  while (next(ctx)) {
  }
  return false;
}


