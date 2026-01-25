import {RuleFn} from './rule';
import {Context} from './context';

export function tryOptinal<
  C extends Context,
  R,
  D
>(ctx: C, rule: RuleFn<C, R>, default_: D): D | R {
  const res = rule(ctx);
  return res === null ? default_ : res;
}
