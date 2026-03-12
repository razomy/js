import * as offset from '@razomy/offset';
import * as token from '@razomy/token';

export interface WithDeep {
  deep: number;
}

export interface WithStack {
  stack: number[];
}

export function tryAligned<TToken extends token.WithTokenType<any> & WithDeep, D extends object>(
  ctx: token.WithTokens<TToken> & offset.WithOffset & WithStack,
  deafult: D = {} as D,
) {
  const t = ctx.tokens[ctx.offset];
  const currentIndent = ctx.stack[ctx.stack.length - 1] ?? -1;

  if (!t || t.deep >= currentIndent) {
    return deafult;
  }

  return null;
}
