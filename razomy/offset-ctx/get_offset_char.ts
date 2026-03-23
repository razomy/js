import * as offset from '../abstracts/arrays/offest';
import * as string from '@razomy/string';

export function getOffsetChar(ctx: string.WithString & offset.WithOffset) {
  return ctx.string[ctx.offset];
}
