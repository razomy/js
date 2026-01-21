type PipeFn<T, R> = (arg: T) => R | Promise<R>;

export async function pipeAsync<T, A>(arg: T, f1: PipeFn<T, A>): Promise<A>;
export async function pipeAsync<T, A, B>(arg: T, f1: PipeFn<T, A>, f2: PipeFn<A, B>): Promise<B>;
export async function pipeAsync<T, A, B, C>(arg: T, f1: PipeFn<T, A>, f2: PipeFn<A, B>, f3: PipeFn<B, C>): Promise<C>;
export async function pipeAsync<T, A, B, C, D>(arg: T, f1: PipeFn<T, A>, f2: PipeFn<A, B>, f3: PipeFn<B, C>, f4: PipeFn<C, D>): Promise<D>;
export async function pipeAsync<T, A, B, C, D, E>(arg: T, f1: PipeFn<T, A>, f2: PipeFn<A, B>, f3: PipeFn<B, C>, f4: PipeFn<C, D>, f5: PipeFn<D, E>): Promise<E>;
export async function pipeAsync<T, A, B, C, D, E, F>(arg: T, f1: PipeFn<T, A>, f2: PipeFn<A, B>, f3: PipeFn<B, C>, f4: PipeFn<C, D>, f5: PipeFn<D, E>, f6: PipeFn<E, F>): Promise<F>;
export async function pipeAsync<T, F>(arg: T, ...fns: [PipeFn<T, any>, ...PipeFn<any, any>[], PipeFn<any, F>]): Promise<F>;
export async function pipeAsync(initialValue: any, ...fns: PipeFn<any, any>[]): Promise<any> {
  let result = initialValue;
  for (const fn of fns) {
    result = await fn(result);
  }
  return result;
}

export const pA = pipeAsync;