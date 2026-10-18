import * as abstractions from "@razomy/abstractions";

export function defaultPrevOffset<T extends abstractions.array.HasPrevOffset>(ctx: T) {
  ctx.prevOffset = 0;
  return ctx;
}
