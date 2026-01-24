import {Context} from './context';
import {RuleFn, RuleFnResult, RuleResult} from './rule';

export function tryOneOf<
  C extends Context,
  R extends RuleFn<C, any>
>(ctx: C, rules: R[]): RuleResult<RuleFnResult<R>> {
  for (const rule of rules) {
    const res = rule(ctx);
    if (res) return res;
  }
  return null;
}
