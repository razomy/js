import {Context, RuleResult} from './ctx';

export function tryToken<R, T>(tokenType: T, ctx: Context<R, T>): RuleResult<T> | null {
  const t = ctx.tokens[ctx.offset];
  if (t === tokenType) {
    return {result: t, offset: 1};
  }
  return null;
}

export type TryToken<T> = [typeof tryToken, T];
