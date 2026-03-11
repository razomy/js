import {findIndex} from './find_index';

/**
 * @summary Find an item in an array that matches the predicate.
 * Throws an error if no item is found.
 * @template T
 * @param array The array to search.
 * @param predicate The function invoked per iteration.
 * @returns The found item.
 * @throws {Error} If the item is not found.
 * @example
 * ```ts
 * find([1, 2, 3], (n) => n === 2); // => 2
 * ```
 * @example
 * ```ts
 * find([{ id: 1 }, { id: 2 }], (o) => o.id === 1); // => { id: 1 }
 * ```
 * @example
 * ```ts
 * find([1, 2, 3], (n) => n === 4); // => Error: Item not found.
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function find<T>(array: T[], predicate: (item: T, index: number, array: T[]) => boolean): T {
  return array[findIndex(array, predicate)];
}
