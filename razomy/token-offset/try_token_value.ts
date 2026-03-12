import * as offset from '@razomy/offset';
import * as abstracts from '@razomy/abstracts';
import * as token from '@razomy/token';

export function tryTokenValue<
  TToken extends token.WithTokenType<any> & abstracts.domains.WithValue<string>,
  TTokenType extends TToken['tokenType'],
>(ctx: token.WithTokens<TToken> & offset.WithOffset, targetType: TTokenType) {
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
