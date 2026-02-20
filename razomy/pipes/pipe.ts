import type {Alias} from '@razomy/alias';

export type PipeAsync<T, R> = (arg: T) => R | Promise<R>;

export async function pipe<T, A>(arg: T, f1: PipeAsync<T, A>): Promise<A>;
export async function pipe<T, A, B>(arg: T, f1: PipeAsync<T, A>, f2: PipeAsync<A, B>): Promise<B>;
export async function pipe<T, A, B, C>(arg: T, f1: PipeAsync<T, A>, f2: PipeAsync<A, B>, f3: PipeAsync<B, C>): Promise<C>;
export async function pipe<T, A, B, C, D>(arg: T, f1: PipeAsync<T, A>, f2: PipeAsync<A, B>, f3: PipeAsync<B, C>, f4: PipeAsync<C, D>): Promise<D>;
export async function pipe<T, A, B, C, D, E>(arg: T, f1: PipeAsync<T, A>, f2: PipeAsync<A, B>, f3: PipeAsync<B, C>, f4: PipeAsync<C, D>, f5: PipeAsync<D, E>): Promise<E>;
export async function pipe<T, A, B, C, D, E, F>(arg: T, f1: PipeAsync<T, A>, f2: PipeAsync<A, B>, f3: PipeAsync<B, C>, f4: PipeAsync<C, D>, f5: PipeAsync<D, E>, f6: PipeAsync<E, F>): Promise<F>;
export async function pipe<T, F>(arg: T, ...fns: [PipeAsync<T, any>, ...PipeAsync<any, any>[], PipeAsync<any, F>]): Promise<F>;
export async function pipe(initialValue: any, ...fns: PipeAsync<any, any>[]): Promise<any> {
  let result = initialValue;
  for (const fn of fns) {
    result = await fn(result);
  }
  return result;
}

export const p: Alias<typeof pipe> = pipe;