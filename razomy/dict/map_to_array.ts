/**
 * @summary Maps an object's entries to an array.
 * @description Iterates over the dictionary entries and transforms them using the provided callback.
 * @param obj The dictionary to map.
 * @param cb The transformation function receiving key and value.
 * @returns An array of transformed values.
 * @example
 * ```ts
 * mapToArray({ a: 1, b: 2 }, (k, v) => `${k}${v}`); // => ['a1', 'b2']
 * ```
 * @example
 * ```ts
 * mapToArray({ x: 10 }, (k, v) => v * 2); // => [20]
 * ```
 * @example
 * ```ts
 * mapToArray({}, (k, v) => v); // => []
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function mapToArray<I, O>(obj: Record<string, I>, cb: (k: string, v: I) => O): O[] {
  return Object.entries(obj).map(([key, value]) => cb(key, value));
}