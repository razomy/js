export type ResultNull<R> = R & { result: any } | null;

export type ResultNullFn<C, R> = (c: C) => ResultNull<R>;

export type FnResultNull<T> = T extends (c: any) => infer R
  ? Exclude<R, null | undefined>
  : never;

export interface ResultNullRegistry<C> {
  [key: string]: ResultNullFn<C, any>
}
