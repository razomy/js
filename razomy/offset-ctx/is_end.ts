import * as offset from "@razomy/offset";
import * as string from "@razomy/string";

export function isEnd(ctx: string.WithString & offset.WithOffset) {
  return ctx.offset === ctx.string.length;
}
