import * as offset from '../abstracts/arrays/offest';

export function defaultPrevOffset<T extends offset.WithPrevOffset>(ctx: T) {
  ctx.prevOffset = 0;
  return ctx;
}
