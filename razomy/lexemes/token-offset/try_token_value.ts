import * as abstracts from '@razomy/abstracts';

export function tryTokenValue<
  TToken extends abstracts.translators.HasTokenType<any> & abstracts.domains.HasValue<string>,
  TTokenType extends TToken['tokenType'],
>(ctx: abstracts.translators.HasTokens<TToken> & abstracts.arrays.HasOffset, targetType: TTokenType) {
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
