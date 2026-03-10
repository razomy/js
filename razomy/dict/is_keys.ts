import type { Dict } from '@razomy/dict';

/**
 * @summary Check if a dictionary contains any of the specified keys.
 * @description Returns `true` if at least one of the provided keys exists in the dictionary, `false` otherwise.
 * @param dict The dictionary to check.
 * @param keys The array of keys to look for.
 * @returns `true` if any key is present, `false` otherwise.
 * @example
 * ```ts
 * isKeys({ a: 1, b: 2 }, ['a', 'c']); // => true
 * ```
 * @example
 * ```ts
 * isKeys({ a: 1, b: 2 }, ['c', 'd']); // => false
 * ```
 * @example
 * ```ts
 * isKeys({}, ['a']); // => false
 * ```
 * @complexity time O(n)
 * @complexity memory O(1)
 */
export function isKeys<T>(dict: Dict<T>, keys: readonly string[]): boolean {
  return keys.some((key) => key in dict);
}
