import {Execute} from "razomy.js/pipes/booleans/execute";

export function while_<T>(ctx: T, next: Execute<T>) {
  while (next(ctx)) {
  }
  return false;
}
