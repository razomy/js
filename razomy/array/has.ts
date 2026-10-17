import * as array_ from '@razomy/array';

/**
 * @summary Checks if an item matching the predicate exists in the array.
 * @description Checks if an item in an array matches the predicate. Returns `true` if found, otherwise `false`.
 * @template T
 * @param array The array to search.
 * @param predicate The function invoked per iteration.
 * @returns True if a matching item is found, otherwise false.
 * @example
 * ```ts
 * has([1, 2, 3], (n) => n === 2); // => true
 * ```
 * @example
 * ```ts
 * has([{ id: 1 }, { id: 2 }], (o) => o.id === 1); // => true
 * ```
 * @example
 * ```ts
 * has([1, 2, 3], (n) => n === 4); // => false
 * ```
 * @complexity time O(n)
 * @complexity memory O(1)
 */
export function has<T>(array: T[], predicate: (item: T, index: number, array: T[]) => boolean): boolean {
  return array_.tryFindIndex(array, predicate) !== null;
}
