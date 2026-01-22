/**
 * Creates a new array with all elements that pass the test implemented by the provided function.
 * @param array The array to iterate over.
 * @param predicate The function invoked per iteration.
 * @returns Returns the new filtered array.
 * @example
 * // => [2, 4]
 * filter([1, 2, 3, 4], (n) => n % 2 === 0);
 * @example
 * // => [{ id: 1 }]
 * filter([{ id: 1 }, { id: 2 }], (item) => item.id === 1);
 * @example
 * // => ['a', 'c']
 * filter(['a', 'b', 'c'], (_, index) => index !== 1);
 */
export function filter<T>(array: T[], predicate: (item: T, index: number, array: T[]) => boolean): T[] {
  return array.filter(predicate);
}