export type Callable<TArgs extends unknown[], TReturn> = (...args: TArgs) => TReturn;
export type Constructable<TInstance, TArgs extends unknown[]> = new (...args: TArgs) => TInstance;

export type Future<T> = Promise<T>;
export type Stream<T> = AsyncIterable<T>;
