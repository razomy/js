type PipeFn<T, R> = (arg: T) => R;

export function pipe<T, A>(arg: T, f1: PipeFn<T, A>): A;
export function pipe<T, A, B>(arg: T, f1: PipeFn<T, A>, f2: PipeFn<A, B>): B;
export function pipe<T, A, B, C>(arg: T, f1: PipeFn<T, A>, f2: PipeFn<A, B>, f3: PipeFn<B, C>): C;
export function pipe<T, A, B, C, D>(arg: T, f1: PipeFn<T, A>, f2: PipeFn<A, B>, f3: PipeFn<B, C>, f4: PipeFn<C, D>): D;
export function pipe<T, A, B, C, D, E>(arg: T, f1: PipeFn<T, A>, f2: PipeFn<A, B>, f3: PipeFn<B, C>, f4: PipeFn<C, D>, f5: PipeFn<D, E>): E;
export function pipe<T, A, B, C, D, E, F>(arg: T, f1: PipeFn<T, A>, f2: PipeFn<A, B>, f3: PipeFn<B, C>, f4: PipeFn<C, D>, f5: PipeFn<D, E>, f6: PipeFn<E, F>): F;
export function pipe<T, F>(arg: T, ...fns: [PipeFn<T, any>, ...PipeFn<any, any>[], PipeFn<any, F>]): F;
export function pipe(initialValue: any, ...fns: PipeFn<any, any>[]): any {
  let result = initialValue;
  for (const fn of fns) {
    result = fn(result);
  }
  return result;
}

export const p = pipe;