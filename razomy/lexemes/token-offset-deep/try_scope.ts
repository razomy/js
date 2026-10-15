import * as resources from '@razomy/resources';
import * as abstractions from '@razomy/abstractions';

export function tryScope<
  C extends abstractions.patterns.IContext & abstractions.translators.HasTokens<any> & abstractions.arrays.HasOffset & abstractions.translators.HasStack,
  T extends { offset: number; result: R2 } | null,
  R2 = any,
>(ctx: C, rule: resources.ResultNullFn<C, T>) {
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

    const res = rule({ ...ctx, offset: ctx.offset + totalOffset });
    if (!res) break;

    totalOffset += res.offset;
    if (res.result) {
      results.push(res.result);
    }
  }

  ctx.stack.pop();
  return results.length > 0 ? { results: results, offset: totalOffset } : null;
}
