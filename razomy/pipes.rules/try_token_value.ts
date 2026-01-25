import {WithOffset} from 'razomy.offset';
import {WithTokens, WithTokenType} from './token';
import {WithValue} from 'razomy.value';

export function tryTokenValue<
  TToken extends WithTokenType<any> & WithValue<string>,
  TTokenType extends TToken['tokenType']
>(
  ctx: WithTokens<TToken> & WithOffset,
  targetType: TTokenType
) {
  const t = ctx.tokens[ctx.offset];
  if (!t) return null;

  if (t.tokenType === targetType) {
    return {
      result: t.value,
      offset: 1
    };
  }
  return null;
}
