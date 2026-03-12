import * as resultNull from "@razomy/result-null";
import * as context from "@razomy/context";

export function optinal<C extends context.Context, R, D>(ctx: C, rule: resultNull.ResultNullFn<C, R>, default_: D): D | R {
  const res = rule(ctx);
  return res === null ? default_ : res;
}
