import {Context, RuleResult} from './ctx';

export function tryOneOf<R, T>(ruleNames: R[], ctx: Context<R, T>): RuleResult<T> | null {
  for (const rule of ruleNames) {
    const res = ctx.parseRule(rule, ctx);
    if (res) return res;
  }
  return null;
}

export type TryOneOf<R> = [typeof tryOneOf, R[]];
