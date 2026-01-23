import {BoolExecute} from 'razomy.pipes.booleans';

export function all<T>(ctx: T, nexts: BoolExecute<T>[]) {
  for (const item of nexts) {
    let isComplete = item(ctx);
    if (!isComplete) {
      return false;
    }
  }
  return true;
}


