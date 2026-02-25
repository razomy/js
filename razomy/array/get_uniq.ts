/**
 * Creates a duplicate-free version of an array.
 * @param {readonly T[]} array The array to inspect.
 * @returns The new duplicate-free array.
 * @example
 * ```ts
 * getUniq([1, 2, 1]); // => [1, 2]
 * ```
 * @example
 * ```ts
 * getUniq(['a', 'b', 'a']); // => ['a', 'b']
 * ```
 * @example
 * ```ts
 * getUniq([1, '1', 1]); // => [1, '1']
 * ```
 */
export function getUniq<T>(array: readonly T[]): T[] {
  return Array.from(new Set(array));
}
