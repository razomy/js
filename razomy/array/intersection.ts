/**
 * Create an array of unique values that are included in both given arrays.
 * @param source The array to inspect.
 * @param target The values to include.
 * @returns The new array of intersecting values.
 * @example
 * ```ts
 * intersection([1, 2], [2, 3]); // => [2]
 * ```
 * @example
 * ```ts
 * intersection(['a', 'b'], ['a', 'c']); // => ['a']
 * ```
 * @example
 * ```ts
 * intersection([1, 2], [3, 4]); // => []
 * ```
 */
export function intersection<T>(source: T[], target: T[]): T[] {
  const targetSet = new Set(target);
  return Array.from(new Set(source)).filter((item) => targetSet.has(item));
}
