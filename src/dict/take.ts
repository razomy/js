export type SomeOf<T> = {
  [K in keyof Partial<T>]: T[K];
};

/**
 * @summary Creates a partial subset of the original object type.
 * @description Extracts a subset of properties from an object type.
 * @param obj The source object.
 * @param keys The keys to extract.
 * @returns An object containing only the specified keys.
 * @example
 * ```ts
 * someOf({ a: 1, b: 2, c: 3 }, ['a', 'c']); // => { a: 1, c: 3 }
 * ```
 * @example
 * ```ts
 * someOf({ id: 1, name: 'A' }, ['id']); // => { id: 1 }
 * ```
 * @example
 * ```ts
 * someOf({ x: 10, y: 20 }, []); // => {}
 * ```
 * @complexity time O(k) where k is number of keys
 * @complexity memory O(k)
 */
export function take<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    result[key] = obj[key];
  }
  return result;
}
