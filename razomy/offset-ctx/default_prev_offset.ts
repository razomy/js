import * as offset from '@razomy/offset';

export function defaultPrevOffset<T extends offset.WithPrevOffset>(ctx: T) {
  ctx.prevOffset = 0;
  return ctx;
}
