import {Execute} from "razomy.pipes/booleans/execute";

function while_<T>(ctx: T, next: Execute<T>) {
  while (next(ctx)) {
  }
  return false;
}

export default while_;
