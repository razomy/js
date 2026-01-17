import {Execute} from 'razomy.pipes/booleans/execute';

export function all<T>(ctx: T, nexts: Execute<T>[]) {
  for (const item of nexts) {
    let isComplete = item(ctx);
    if (!isComplete) {
      return false;
    }
  }
  return true;
}


