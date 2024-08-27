import {Execute} from "razomy.js/pipes/booleans/execute";

export function loop<T>(ctx: T, next: Execute<T>) {
  while (next(ctx)) {
  }
  return false;
}
