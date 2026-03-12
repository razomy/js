import * as offset from '@razomy/offset';

export function defaultOffset<T extends offset.WithOffset>(ctx: T): T {
  ctx.offset = 0;
  return ctx;
}
