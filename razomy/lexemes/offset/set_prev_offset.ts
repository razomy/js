import * as abstractions from "@razomy/abstractions";

export function setPrevOffset(ctx: abstractions.arrays.HasOffset & abstractions.arrays.HasPrevOffset, lexeme: abstractions.arrays.HasOffset) {
  lexeme.offset = ctx.prevOffset;
  ctx.prevOffset = ctx.offset;
  return lexeme;
}
