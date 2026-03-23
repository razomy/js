import * as offset from '../abstracts/arrays/offest';

export function defaultOffset<T extends offset.WithOffset>(ctx: T): T {
  ctx.offset = 0;
  return ctx;
}
