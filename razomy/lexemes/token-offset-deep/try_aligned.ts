import * as abstracts from '@razomy/abstracts';

export interface WithDeep {
  deep: number;
}

export interface WithStack {
  stack: number[];
}

export function tryAligned<TToken extends abstracts.translators.WithTokenType<any> & WithDeep, D extends object>(
  ctx: abstracts.translators.WithTokens<TToken> & abstracts.arrays.WithOffset & WithStack,
  deafult: D = {} as D,
) {
  const t = ctx.tokens[ctx.offset];
  const currentIndent = ctx.stack[ctx.stack.length - 1] ?? -1;

  if (!t || t.deep >= currentIndent) {
    return deafult;
  }

  return null;
}
