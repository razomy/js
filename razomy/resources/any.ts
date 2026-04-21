import * as context from '@razomy/context';
import * as resultNull from '@razomy/result-null';

export function any<C extends context.Context, R = any>(ctx: C, rules: resultNull.ResultNullFn<C, R>[]) {
  for (const rule of rules) {
    const res = rule(ctx);
    if (res) return res;
  }
  return null;
}
