/**
 * @summary Creates a new array with all elements that pass the test implemented by the provided function.
 * @param array The array to iterate over.
 * @param predicate The function invoked per iteration.
 * @returns Returns the new filtered array.
 * @example
 * ```ts
 * filter([1, 2, 3, 4], (n) => n % 2 === 0); // => [2, 4]
 * ```
 * @example
 * ```ts
 * filter([{ id: 1 }, { id: 2 }], (item) => item.id === 1); // => [{ id: 1 }]
 * ```
 * @example
 * ```ts
 * filter(['a', 'b', 'c'], (_, index) => index !== 1); // => ['a', 'c']
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function filter<T>(array: T[], predicate: (item: T, index: number, array: T[]) => boolean): T[] {
  return array.filter(predicate);
}
