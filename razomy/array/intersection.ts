/**
 * Create an array of unique values that are included in both given arrays.
 * @param {T[]} source The array to inspect.
 * @param {T[]} target The values to include.
 * @returns {T[]} The new array of intersecting values.
 * @example
 * // => [2]
 * intersection([1, 2], [2, 3]);
 * @example
 * // => ['a']
 * intersection(['a', 'b'], ['a', 'c']);
 * @example
 * // => []
 * intersection([1, 2], [3, 4]);
 */
export function intersection<T>(source: T[], target: T[]): T[] {
  const targetSet = new Set(target);
  return Array.from(new Set(source)).filter((item) => targetSet.has(item));
}