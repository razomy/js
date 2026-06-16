import * as abstracts from '@razomy/abstracts';

export interface HasDeep {
  deep: number;
}

export interface HasStack {
  stack: number[];
}

export function tryAligned<TToken extends abstracts.translators.HasTokenType<any> & HasDeep, D extends object>(
  ctx: abstracts.translators.HasTokens<TToken> & abstracts.arrays.HasOffset & HasStack,
  deafult: D = {} as D,
) {
  const t = ctx.tokens[ctx.offset];
  const currentIndent = ctx.stack[ctx.stack.length - 1] ?? -1;

  if (!t || t.deep >= currentIndent) {
    return deafult;
  }

  return null;
}
