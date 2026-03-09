/**
 * @summary Creates a duplicate-free version of an array.
 * @param array The array to inspect.
 * @returns The new duplicate-free array.
 * @example
 * ```ts
 * uniq([1, 2, 1]); // => [1, 2]
 * ```
 * @example
 * ```ts
 * uniq(['a', 'b', 'a']); // => ['a', 'b']
 * ```
 * @example
 * ```ts
 * uniq([1, '1', 1]); // => [1, '1']
 * ```
 */
export function uniq<T>(array: readonly T[]): T[] {
  return Array.from(new Set(array));
}
