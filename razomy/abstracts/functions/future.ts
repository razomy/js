export type Future<T> = Promise<T>;
export type FutureCallback = () => Promise<void>;
export type Stream<T> = AsyncIterable<T>;
