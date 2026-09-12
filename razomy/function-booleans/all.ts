import * as functionBooleans from '@razomy/function-booleans';

export function all<T extends any[]>(ctx: T, nexts: functionBooleans.BoolExecute<T>[]) {
  for (const item of nexts) {
    const isComplete = item(...ctx);
    if (!isComplete) {
      return false;
    }
  }
  return true;
}
