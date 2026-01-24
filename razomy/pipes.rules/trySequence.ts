import {Context} from './context';
import {RuleFn, RuleResult} from './rule';
import {WithOffset} from 'razomy.offset';

export function trySequence<
  C extends Context & WithOffset,
  R extends { offset: number }
>(ctx: C, rules: RuleFn<C, R>[]): RuleResult<{ results: R[], offset: number }> {

  let totalOffset = 0;
  const results: R[] = [];

  for (const rule of rules) {
    const res = rule({...ctx, offset: ctx.offset + totalOffset});
    if (!res) return null;

    totalOffset += res.offset;
    results.push(res);
  }
  return {results: results, offset: totalOffset};
}
