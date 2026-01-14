import {Execute} from "razomy.pipes/booleans/execute";

function any<T>(ctx: T, nexts: Execute<T>[]) {
  for (const item of nexts) {
    let is_complete = item(ctx);
    if (is_complete) {
      return true;
    }
  }
  return false;
}

export default any;
