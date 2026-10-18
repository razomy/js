import * as array_ from '@razomy/array';

/**
 * @summary Find an item in an array that matches the predicate.
 * @description Find an item in an array that matches the predicate. Returns null if no item is found.
 * @template T
 * @param array The array to search.
 * @param predicate The function invoked per iteration.
 * @returns The found item, or null if not found.
 * @example
 * ```ts
 * tryFind([1, 2, 3], (n) => n === 2); // => 2
 * ```
 * @example
 * ```ts
 * tryFind([{ id: 1 }, { id: 2 }], (o) => o.id === 1); // => { id: 1 }
 * ```
 * @example
 * ```ts
 * tryFind([1, 2, 3], (n) => n === 4); // => null
 * ```
 * @complexity time O(n)
 * @complexity memory O(1)
 */
export function tryFind<T>(array: T[], predicate: (item: T, index: number, array: T[]) => boolean): T | null {
  const index = array_.tryFindIndex(array, predicate);
  if (index === null) {
    return null;
  }
  return array[index];
}
