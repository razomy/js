import { pipe } from './pipe';

export type Unary<T, R> = (arg: T) => R;

export function functionPipe<A , B>(fn1: Unary<A, B>): (a: A) => B;
export function functionPipe<A , B, C>(fn1: Unary<A, B>, fn2: Unary<B, C>): (a: A) => C;
export function functionPipe<A , B, C, D>(fn1: Unary<A, B>, fn2: Unary<B, C>, fn3: Unary<C, D>): (a: A) => D;
export function functionPipe<A , B, C, D, E>(fn1: Unary<A, B>, fn2: Unary<B, C>, fn3: Unary<C, D>, fn4: Unary<D, E>): (a: A) => E;
export function functionPipe<A , B, C, D, E, F>(fn1: Unary<A, B>, fn2: Unary<B, C>, fn3: Unary<C, D>, fn4: Unary<D, E>, fn5: Unary<E, F>): (a: A) => F;
export function functionPipe<A , B, C, D, E, F, G>(fn1: Unary<A, B>, fn2: Unary<B, C>, fn3: Unary<C, D>, fn4: Unary<D, E>, fn5: Unary<E, F>, fn6: Unary<F, G>): (a: A) => G;
export function functionPipe<A , B, C, D, E, F, G, H>(fn1: Unary<A, B>, fn2: Unary<B, C>, fn3: Unary<C, D>, fn4: Unary<D, E>, fn5: Unary<E, F>, fn6: Unary<F, G>, fn7: Unary<G, H>): (a: A) => H;
export function functionPipe<A , B, C, D, E, F, G, H, I>(fn1: Unary<A, B>, fn2: Unary<B, C>, fn3: Unary<C, D>, fn4: Unary<D, E>, fn5: Unary<E, F>, fn6: Unary<F, G>, fn7: Unary<G, H>, fn8: Unary<H, I>): (a: A) => I;
export function functionPipe<C, I>(...fns: Unary<any, any>[]): (initial: C) => I {
  return (initial) => pipe(initial, ...fns);
}

export const fP = functionPipe;