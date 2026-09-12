import * as functionBooleans from '@razomy/function-booleans';

export function any<T extends any[]>(ctx: T, nexts: functionBooleans.BoolExecute<T>[]) {
  for (const item of nexts) {
    const isComplete = item(...ctx);
    if (isComplete) {
      return true;
    }
  }
  return false;
}
