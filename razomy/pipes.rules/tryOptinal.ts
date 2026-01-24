import {RuleFn, RuleFnResult} from './rule';
import {Context} from './context';

export function tryOptinal<
  C extends Context,
  R extends RuleFn<C, any>,
>(ctx: C, rule: R, deafult_ = {}): typeof deafult_ | RuleFnResult<R> {
  const res = rule(ctx);
  return res === null ? deafult_ : res;
}
