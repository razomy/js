import {Context} from './create_context';
import {RuleFn, RuleFnResult, RuleResult} from './rule';

export function tryAny<
  C extends Context,
  R = any
>(ctx: C, rules: RuleFn<C, R>[]) {
  for (const rule of rules) {
    const res = rule(ctx);
    if (res) return res;
  }
  return null;
}
