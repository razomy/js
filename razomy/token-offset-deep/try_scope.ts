import type {Context} from '@razomy/context';
import type {WithOffset} from '@razomy/offset';
import type {WithStack} from './try_aligned';
import type {ResultNullFn} from '@razomy/result-null';
import type {WithTokens} from '@razomy/token';

export function tryScope<
  C extends Context & WithTokens<any> & WithOffset & WithStack,
  T extends { offset: number, result: R2 } | null,
  R2 = any
>(ctx: C, rule: ResultNullFn<C, T>) {

  const trigger = ctx.tokens[ctx.offset];
  const parentIndent = ctx.stack[ctx.stack.length - 1] ?? -1;

  if (!trigger || (trigger.deep || 0) <= parentIndent) {
    return null;
  }

  ctx.stack.push(trigger.deep || 0);

  let totalOffset = 0;
  const results: R2[] = [];

  while (true) {
    const t = ctx.tokens[ctx.offset + totalOffset];
    if (!t || (t.deep || 0) < (trigger.deep || 0)) break;

    const res = rule({...ctx, offset: ctx.offset + totalOffset});
    if (!res) break;

    totalOffset += res.offset;
    if (res.result) {
      results.push(res.result)
    }
  }

  ctx.stack.pop();
  return results.length > 0 ? {results: results, offset: totalOffset} : null;
}
