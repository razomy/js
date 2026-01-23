import {Context, RuleResult} from './ctx';

export function trySequnce<R, T>(ruleNames: R[], ctx: Context<R, T>): RuleResult<T[]> | null {
  let totalOffset = 0;
  const results: T[] = [];

  for (const rule of ruleNames) {
    const res = ctx.parseRule(rule, {...ctx, offset: ctx.offset + totalOffset});
    if (!res) return null;

    totalOffset += res.offset;
    if (res.result !== null) {
      results.push(res.result);
    }
  }
  return {result: results, offset: totalOffset};
}

export type RuleSeq = [typeof trySequnce, string[]];
