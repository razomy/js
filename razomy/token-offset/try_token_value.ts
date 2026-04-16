import * as abstracts from '@razomy/abstracts';

export function tryTokenValue<
  TToken extends abstracts.translators.WithTokenType<any> & abstracts.domains.WithValue<string>,
  TTokenType extends TToken['tokenType'],
>(ctx: abstracts.translators.WithTokens<TToken> & abstracts.arrays.WithOffset, targetType: TTokenType) {
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
