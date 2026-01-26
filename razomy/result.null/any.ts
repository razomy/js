import {Context} from 'razomy.context';
import {ResultNullFn} from 'razomy.result.null';

export function any<
  C extends Context,
  R = any
>(ctx: C, rules: ResultNullFn<C, R>[]) {
  for (const rule of rules) {
    const res = rule(ctx);
    if (res) return res;
  }
  return null;
}
