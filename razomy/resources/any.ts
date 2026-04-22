import * as resources from '@razomy/resources';
import * as abstracts from '@razomy/abstracts';

export function any<C extends abstracts.structures.Context, R = any>(ctx: C, rules: resources.ResultNullFn<C, R>[]) {
  for (const rule of rules) {
    const res = rule(ctx);
    if (res) return res;
  }
  return null;
}
