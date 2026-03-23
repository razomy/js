import * as offset from '../abstracts/arrays/offest';

export function setPrevOffset(ctx: offset.WithOffset & offset.WithPrevOffset, lexeme: offset.WithOffset) {
  lexeme.offset = ctx.prevOffset;
  ctx.prevOffset = ctx.offset;
  return lexeme;
}
