import {WithOffset} from 'razomy.offset';

export function defaultOffset<T extends WithOffset>(ctx: T): T {
  ctx.offset = 0;
  return ctx;
}
