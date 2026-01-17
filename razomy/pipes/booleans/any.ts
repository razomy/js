import {Execute} from 'razomy.pipes/booleans/execute';

export function any<T>(ctx: T, nexts: Execute<T>[]) {
  for (const item of nexts) {
    let isComplete = item(ctx);
    if (isComplete) {
      return true;
    }
  }
  return false;
}


