import * as abstractions from "@razomy/abstractions";

export function any<C extends abstractions.patterns.IContext, R = any>(ctx: C, rules: abstractions.function_.Function<[C], R | null>[]) {
  for (const rule of rules) {
    const res = rule(ctx);
    if (res) return res;
  }

  return null;
}
