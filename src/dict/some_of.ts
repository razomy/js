export type SomeOf<T> = {
  [K in keyof Partial<T>]: T[K];
};
