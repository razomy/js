import * as abstractions from '@razomy/abstractions';

export function tryAligned<TToken extends abstractions.translator.HasTokenType<any> & abstractions.translator.HasDeep, D extends object>(
  ctx: abstractions.translator.HasTokens<TToken> & abstractions.array.HasOffset & abstractions.translator. HasStack,
  deafult: D = {} as D,
) {
  const t = ctx.tokens[ctx.offset];
  const currentIndent = ctx.stack[ctx.stack.length - 1] ?? -1;

  if (!t || t.deep >= currentIndent) {
    return deafult;
  }

  return null;
}
