import {Execute} from "razomy.js/pipes/booleans/execute";

export function any<T>(ctx: T, nexts: Execute<T>[]) {
  for (const item of nexts) {
    let is_complete = item(ctx);
    if (is_complete) {
      return true;
    }
  }
  return false;
}
