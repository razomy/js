import * as offset from '../abstracts/arrays/offest';
import * as string from '@razomy/string';
import * as offsetCtx from '@razomy/offset-ctx';

export function tryAnyOfChar(ctx: string.WithString & offset.WithOffset, chars: Set<string>) {
  if (chars.has(offsetCtx.getOffsetChar(ctx))) {
    ctx.offset += 1;
    return true;
  }
  return false;
}
