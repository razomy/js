import {Context} from '@razomy/context';
import {WithOffset} from '@razomy/offset';
import { ResultNullFn } from "@razomy/result.null";

export function tryAll<
  C extends Context & WithOffset,
  R extends readonly ResultNullFn<C,{ offset: number, result: any }>[],
>(ctx: C, rules: R) {

  let totalOffset = 0;
  const results: [...{ [K in keyof R]: NonNullable<ReturnType<R[K]>>['result'] }] = [] as any;

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
// function liftContext<C extends Context & WithOffset>(ctx: C, delta: number): C {
//   if (delta === 0) return ctx;
//   return { ...ctx, offset: ctx.offset + delta };
// }
//
// type State = { offset: number; results: any[] };
//
// function accumulateState(acc: State, next: { offset: number; result: any }): State {
//   // We mutate 'acc' here for performance (common in JS reducers),
//   // but conceptually it returns a new state.
//   acc.offset += next.offset;
//   if (next.result) {
//     acc.results.push(next.result);
//   }
//   return acc;
// }
//
// function createPipeline<C, S, R>(
//   // Logic 1: How to prepare input
//   liftFn: (ctx: C, stateData: any) => C,
//   // Logic 2: How to merge output
//   mergeFn: (state: S, result: R) => S,
//   // Initial State Factory
//   initialStateFn: () => S
// ) {
//   // Returns the actual function you will use
//   return (ctx: C, rules: readonly ((c: C) => R | null)[]) => {
//     const state = initialStateFn();
//
//     // Functional Loop (Short-circuiting reduce)
//     for (const rule of rules) {
//       // 1. Lift Context
//       // We assume 'state' has the data needed for lifting (e.g. offset)
//       const nextCtx = liftFn(ctx, (state as any).offset);
//
//       // 2. Execute
//       const res = rule(nextCtx);
//
//       // 3. Short Circuit (The "Maybe" check)
//       if (!res) return null;
//
//       // 4. Merge State
//       mergeFn(state, res);
//     }
//
//     return state;
//   };
// }
//
// // Unite the functions to create tryAll
// export const tryAll = createPipeline(
//   liftContext,      // The "Split" context logic
//   accumulateState,  // The "Split" state logic
//   () => ({ offset: 0, results: [] }) // Initial State
// );
