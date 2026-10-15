import * as abstractions from "@razomy/abstractions";

export function defaultOffset<T extends abstractions.arrays.HasOffset>(ctx: T): T {
  ctx.offset = 0;
  return ctx;
}
