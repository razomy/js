import * as offset from '../abstracts/arrays/offest';
import * as string from '@razomy/string';

export function getNextOffsetChar(ctx: string.WithString & offset.WithOffset) {
  return ctx.string[ctx.offset + 1];
}
