import * as offset from '../abstracts/arrays/offest';
import * as string from '@razomy/string';

export function isEnd(ctx: string.WithString & offset.WithOffset) {
  return ctx.offset === ctx.string.length;
}
