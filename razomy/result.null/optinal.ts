import {ResultNullFn} from '@razomy/result.null';
import {Context} from '@razomy/context';

export function optinal<
  C extends Context,
  R,
  D
>(ctx: C, rule: ResultNullFn<C, R>, default_: D): D | R {
  const res = rule(ctx);
  return res === null ? default_ : res;
}
