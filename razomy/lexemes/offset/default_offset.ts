import * as abstracts from "@razomy/abstracts";

export function defaultOffset<T extends abstracts.arrays.WithOffset>(ctx: T): T {
  ctx.offset = 0;
  return ctx;
}
