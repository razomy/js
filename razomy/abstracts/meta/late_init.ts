export type LateInit<T> = T;
export type NullOptional<T> = T | null

export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};
