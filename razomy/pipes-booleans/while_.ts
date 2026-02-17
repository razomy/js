import {BoolExecute} from '@razomy/pipes-booleans';

export function while_<T>(ctx: T, next: BoolExecute<T>) {
  while (next(ctx)) {
  }
  return false;
}
