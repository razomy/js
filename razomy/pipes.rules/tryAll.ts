import {Context} from './context';
import {RuleFn} from './rule';
import {WithOffset} from 'razomy.offset';

export function tryAll<
  C extends Context & WithOffset,
  R extends { offset: number, result: R2 } | null,
  R2 = any
>(ctx: C, rules: RuleFn<C, R>[]) {

  let totalOffset = 0;
  const results: R2[] = [];

  for (const rule of rules) {
    const res = rule({...ctx, offset: ctx.offset + totalOffset});
    if (!res) return null;

    totalOffset += res.offset;
    if (res.result) {
      results.push(res.result);
    }
  }
  return {results: results, offset: totalOffset};
}

//
//
// function _all<
//   C,
//   R
// >(ctx: C, rules: ((c: C) => R)[]) {
//   const results: R[] = [];
//   for (const rule of rules) {
//     const res = rule(ctx);
//     results.push(res);
//   }
//   return results;
// }
//
// function _ifIter<
//   C,
//   R
// >(ctx: C, rule: (c: C) => R[]) {
//   const res = rule(ctx);
//   return res;
// }
//
// function _OffsetIter<
//   C,
//   R
// >(ctx: C, rule: (c: C) => R[]) {
//   let totalOffset = 0;
//   const res = rule({...ctx, offset: ctx.offset + totalOffset});
//   totalOffset += res.offset;
//   return {offset: totalOffset};
// }
