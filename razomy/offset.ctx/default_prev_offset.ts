import {Offset, WithPrevOffset} from 'razomy.offset';

export function defaultPrevOffset<T extends WithPrevOffset>(
  ctx: T) {
  ctx.prevOffset = 0;
  return ctx;
}


