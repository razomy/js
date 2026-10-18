import * as abstractions from '@razomy/abstractions';

export function tryTokenValue<
  TToken extends abstractions.translator.HasTokenType<any> & abstractions.structure.HasValue<string>,
  TTokenType extends TToken['tokenType'],
>(ctx: abstractions.translator.HasTokens<TToken> & abstractions.array.HasOffset, targetType: TTokenType) {
  const t = ctx.tokens[ctx.offset];
  if (!t) return null;

  if (t.tokenType === targetType) {
    return {
      result: t.value,
      offset: 1,
    };
  }
  return null;
}
