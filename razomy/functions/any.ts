import * as abstracts from "@razomy/abstracts";

export function any<C extends abstracts.domains.IContext, R = any>(ctx: C, rules: abstracts.functions.Function<[C], R | null>[]) {
  for (const rule of rules) {
    const res = rule(ctx);
    if (res) return res;
  }

  return null;
}
