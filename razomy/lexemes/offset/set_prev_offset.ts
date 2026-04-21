import * as abstracts from "@razomy/abstracts";

export function setPrevOffset(ctx: abstracts.arrays.WithOffset & abstracts.arrays.WithPrevOffset, lexeme: abstracts.arrays.WithOffset) {
  lexeme.offset = ctx.prevOffset;
  ctx.prevOffset = ctx.offset;
  return lexeme;
}
