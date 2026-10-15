import * as abstractions from '@razomy/abstractions';

export function tryAligned<TToken extends abstractions.translators.HasTokenType<any> & abstractions.translators.HasDeep, D extends object>(
  ctx: abstractions.translators.HasTokens<TToken> & abstractions.arrays.HasOffset & abstractions.translators. HasStack,
  deafult: D = {} as D,
) {
  const t = ctx.tokens[ctx.offset];
  const currentIndent = ctx.stack[ctx.stack.length - 1] ?? -1;

  if (!t || t.deep >= currentIndent) {
    return deafult;
  }

  return null;
}
