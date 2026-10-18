import * as abstractions from "@razomy/abstractions";

export function defaultOffset<T extends abstractions.array.HasOffset>(ctx: T): T {
  ctx.offset = 0;
  return ctx;
}
