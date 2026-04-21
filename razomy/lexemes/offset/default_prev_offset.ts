import * as abstracts from "@razomy/abstracts";

export function defaultPrevOffset<T extends abstracts.arrays.WithPrevOffset>(ctx: T) {
  ctx.prevOffset = 0;
  return ctx;
}
