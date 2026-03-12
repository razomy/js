import * as offset from "@razomy/offset";
import * as string from "@razomy/string";

export function getNextOffsetChar(ctx: string.WithString & offset.WithOffset) {
  return ctx.string[ctx.offset + 1];
}
