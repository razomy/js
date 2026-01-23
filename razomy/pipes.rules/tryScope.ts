import {Context, RuleResult} from './ctx';
import {WithDeep} from './tryAligned';

export function tryScope<R, T extends WithDeep>(ruleName: R, ctx: Context<R, T>): RuleResult<T[]> | null {
  const trigger = ctx.tokens[ctx.offset];
  const parentIndent = ctx.stack[ctx.stack.length - 1] ?? -1;

  if (!trigger || (trigger.deep || 0) <= parentIndent) {
    return null;
  }

  ctx.stack.push(trigger.deep || 0);

  let totalOffset = 0;
  const results: any[] = [];

  while (true) {
    const t = ctx.tokens[ctx.offset + totalOffset];
    if (!t || (t.deep || 0) < (trigger.deep || 0)) break;

    const res = ctx.parseRule(ruleName, {...ctx, offset: ctx.offset + totalOffset});
    if (!res) break;

    totalOffset += res.offset;
    // Only push non-null results
    if (res.result !== null) {
      results.push(res.result);
    }
  }

  ctx.stack.pop();
  return results.length > 0 ? {result: results, offset: totalOffset} : null;
}

export type RuleScope = [typeof tryScope, string];
