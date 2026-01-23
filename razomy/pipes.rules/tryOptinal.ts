import {Context, RuleResult} from './ctx';

export function tryOptinal<R, T>(ruleName: R, ctx: Context<R, T>): RuleResult<T> | null {
  const res = ctx.parseRule(ruleName, ctx);
  return res ? res : {result: null, offset: 0};
}

export type TryOptinal = [typeof tryOptinal, string];
