export type Callable<TArgs extends unknown[], TReturn> = (...args: TArgs) => TReturn;
export type Constructable<TInstance, TArgs extends unknown[]> = new (...args: TArgs) => TInstance;

