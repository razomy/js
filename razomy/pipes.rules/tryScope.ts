import {Context} from './context';
import {RuleFn, RuleFnResult, RuleResult} from './rule';
import {WithTokens} from './token';
import {WithOffset} from 'razomy.offset';
import {WithStack} from './tryAligned';


export function tryScope<
  C extends Context & WithTokens<any> & WithOffset & WithStack,
  T extends  { offset: number }
>(ctx: C, rule: RuleFn<C, T>): RuleResult<{ results: T[], offset: number }> {

  const trigger = ctx.tokens[ctx.offset];
  const parentIndent = ctx.stack[ctx.stack.length - 1] ?? -1;

  if (!trigger || (trigger.deep || 0) <= parentIndent) {
    return null;
  }

  ctx.stack.push(trigger.deep || 0);

  let totalOffset = 0;
  const results: T[] = [];

  while (true) {
    const t = ctx.tokens[ctx.offset + totalOffset];
    if (!t || (t.deep || 0) < (trigger.deep || 0)) break;

    const res = rule({...ctx, offset: ctx.offset + totalOffset});
    if (!res) break;

    totalOffset += res.offset;
    results.push(res)
  }

  ctx.stack.pop();
  return results.length > 0 ? {results: results, offset: totalOffset} : null;
}
