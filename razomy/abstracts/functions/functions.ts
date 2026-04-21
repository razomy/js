export type Call<TArgs extends unknown[], TReturn> = (...args: TArgs) => TReturn;
export type Construct<TInstance, TArgs extends unknown[]> = new (...args: TArgs) => TInstance;

