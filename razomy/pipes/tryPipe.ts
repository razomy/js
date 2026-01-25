export type Pipe<T, R> = (arg: NonNullable<T>) => R;

export function tryP<T, A>(arg: T, f1: Pipe<T, A>): A | null;
export function tryP<T, A, B>(arg: T, f1: Pipe<T, A>, f2: Pipe<A, B>): B| null;
export function tryP<T, A, B, C>(arg: T, f1: Pipe<T, A>, f2: Pipe<A, B>, f3: Pipe<B, C>): C| null;
export function tryP<T, A, B, C, D>(arg: T, f1: Pipe<T, A>, f2: Pipe<A, B>, f3: Pipe<B, C>, f4: Pipe<C, D>): D| null;
export function tryP<T, A, B, C, D, E>(arg: T, f1: Pipe<T, A>, f2: Pipe<A, B>, f3: Pipe<B, C>, f4: Pipe<C, D>, f5: Pipe<D, E>): E| null;
export function tryP<T, A, B, C, D, E, F>(arg: T, f1: Pipe<T, A>, f2: Pipe<A, B>, f3: Pipe<B, C>, f4: Pipe<C, D>, f5: Pipe<D, E>, f6: Pipe<E, F>): F| null;
// export function pipe<T, F>(arg: T, ...fns: [Pipe<T, any>, ...Pipe<any, any>[], Pipe<any, F>]): F;
export function tryP<T, A, F>(arg: T, ...fns: [Pipe<T, A>, Pipe<A, F>]): F| null;
export function tryP<C, I>(arg: C, ...fns: [Pipe<C, I>]): I;
export function tryP(initialValue: any, ...fns: Pipe<any, any>[]) {
  let result = initialValue;
  for (const fn of fns) {
    result = fn(result);
    if (result == null) {
      return null
    }
  }
  return result;
}

// export const tryP = tryPipe;