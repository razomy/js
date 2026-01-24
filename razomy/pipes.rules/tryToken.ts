import {WithOffset} from 'razomy.offset';
import {WithTokens, WithTokenType} from './token';

export function tryToken<
  TToken extends WithTokenType<any>,
  TSpecific extends TToken['tokenType']
>(
  ctx: WithTokens<TToken> & WithOffset,
  targetType: TSpecific
) {
  const t = ctx.tokens[ctx.offset];
  if (!t) return null;

  if (t.tokenType === targetType) {
    return {
      token: t,
      offset: 1
    };
  }
  return null;
}
