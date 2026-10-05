export type LateInit<T> = T;
export type NullOptional<T> = T | null

export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};


/**
 * 2. Безопасное слияние: свойства из B перезаписывают свойства из A,
 * предотвращая превращение типа в `never` при совпадении имен полей.
 */
export type Merge<A, B> = Prettify<Omit<A, keyof B> & B>;
