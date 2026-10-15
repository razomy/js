import * as abstractions from '@razomy/abstractions';

export function tryTokenValue<
  TToken extends abstractions.translators.HasTokenType<any> & abstractions.structures.HasValue<string>,
  TTokenType extends TToken['tokenType'],
>(ctx: abstractions.translators.HasTokens<TToken> & abstractions.arrays.HasOffset, targetType: TTokenType) {
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
