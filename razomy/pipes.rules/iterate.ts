import {RuleFn, RuleFnResult} from './rule';
import {Context} from './context';

export function iterate<
  C extends Context,
  R extends RuleFn<C, any>
>(ctx: C, rule: R): { result: RuleFnResult<R>, offset: number } {
  const result = rule(ctx);
  return {result: result.result, offset: 0}
}
