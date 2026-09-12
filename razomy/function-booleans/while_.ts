import * as functionBooleans from '@razomy/function-booleans';

export function while_<T extends any[]>(ctx: T, next: functionBooleans.BoolExecute<T>) {
  while (next(...ctx)) {}
  return false;
}
