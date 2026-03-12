import * as pipesBooleans from "@razomy/pipes-booleans";

export function while_<T>(ctx: T, next: pipesBooleans.BoolExecute<T>) {
  while (next(ctx)) {}
  return false;
}
