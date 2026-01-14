import {Execute} from "razomy.pipes/booleans/execute";

export function all<T>(ctx: T, nexts: Execute<T>[]) {
  for (const item of nexts) {
    let is_complete = item(ctx);
    if (!is_complete) {
      return false;
    }
  }
  return true;
}

export default all;
