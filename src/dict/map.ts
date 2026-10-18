/**
 * @summary Creates a new dictionary by mapping each value of the object.
 * @description Iterates over the dictionary and produces a new dictionary with the same keys, but values transformed by the provided callback function.
 * @param obj The dictionary to iterate.
 * @param cb The mapping function.
 * @returns A new dictionary with transformed values.
 * @example
 * ```ts
 * map({ a: 1, b: 2 }, (v) => v * 2); // => { a: 2, b: 4 }
 * ```
 * @example
 * ```ts
 * map({ a: 'hi' }, (v, k) => `${k}:${v}`); // => { a: 'a:hi' }
 * ```
 * @example
 * ```ts
 * map({}, (v) => v); // => {}
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function map<I, O>(obj: Record<string, I>, cb: (value: I, key: string) => O): Record<string, O> {
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, cb(value, key)]));
}
