export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
  ) extends (k: infer I) => void
  ? I
  : never;

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export function mergeDicts<T extends readonly Record<PropertyKey, unknown>[]>(
  array: [...T]
) {
  return array.reduce(
    (acc, current) => ({ ...acc, ...current }),
    {} as Prettify<UnionToIntersection<T[number]>>
  );
}