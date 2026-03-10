export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

/**
 * @summary Merge an array of dictionaries into a single dictionary.
 * @description Merges all dictionaries in the given array from left to right, with later entries overwriting earlier ones for duplicate keys.
 * @param dicts The array of dictionaries to merge.
 * @returns A single dictionary containing all key-value pairs from the input dictionaries.
 * @example
 * ```ts
 * merge([{ a: 1 }, { b: 2 }]); // => { a: 1, b: 2 }
 * ```
 * @example
 * ```ts
 * merge([{ a: 1 }, { a: 2, b: 3 }]); // => { a: 2, b: 3 }
 * ```
 * @example
 * ```ts
 * merge([{ x: 'hello' }, { y: 'world' }, { z: true }]); // => { x: 'hello', y: 'world', z: true }
 * ```
 * @complexity time O(n * m) where n is the number of dictionaries and m is the average number of keys
 * @complexity memory O(n * m)
 */
export function merge<T extends readonly Record<PropertyKey, unknown>[]>(
  dicts: [...T],
): Prettify<UnionToIntersection<T[number]>> {
  const result = {} as Record<PropertyKey, unknown>;

  for (const dict of dicts) {
    for (const key of Reflect.ownKeys(dict)) {
      result[key] = dict[key];
    }
  }

  return result as Prettify<UnionToIntersection<T[number]>>;
}
