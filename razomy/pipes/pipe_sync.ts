import {Alias} from '@razomy/alias';

export type Pipe<T, R> = (arg: T) => R;

export function pipeSync<T, A>(arg: T, ...f1: [Pipe<T, A>]): A;
export function pipeSync<T, A, B>(arg: T, f1: Pipe<T, A>, f2: Pipe<A, B>): B;
export function pipeSync<T, A, B, C>(arg: T, f1: Pipe<T, A>, f2: Pipe<A, B>, f3: Pipe<B, C>): C;
export function pipeSync<T, A, B, C, D>(arg: T, f1: Pipe<T, A>, f2: Pipe<A, B>, f3: Pipe<B, C>, f4: Pipe<C, D>): D;
export function pipeSync<T, A, B, C, D, E>(arg: T, f1: Pipe<T, A>, f2: Pipe<A, B>, f3: Pipe<B, C>, f4: Pipe<C, D>, f5: Pipe<D, E>): E;
export function pipeSync<T, A, B, C, D, E, F>(arg: T, f1: Pipe<T, A>, f2: Pipe<A, B>, f3: Pipe<B, C>, f4: Pipe<C, D>, f5: Pipe<D, E>, f6: Pipe<E, F>): F;
// export function pipe<T, F>(arg: T, ...fns: [Pipe<T, any>, ...Pipe<any, any>[], Pipe<any, F>]): F;
export function pipeSync<T, A, F>(arg: T, ...fns: [Pipe<T, A>, Pipe<A, F>]): F;
export function pipeSync<C, I>(arg: C, ...fns: [Pipe<C, I>]): I ;
export function pipeSync(initialValue: any, ...fns: Pipe<any, any>[]): any {
  let result = initialValue;
  for (const fn of fns) {
    result = fn(result);
  }
  return result;
}

export const pS: Alias<typeof pipeSync> = pipeSync;