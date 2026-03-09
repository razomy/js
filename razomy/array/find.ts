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
 * find([1, 2, 3], (n) => n === 2);
 * // => 2
 * ```
 * @example
 * ```ts
 * find([{ id: 1 }, { id: 2 }], (o) => o.id === 1);
 * // => { id: 1 }
 * ```
 * @example
 * ```ts
 * find([1, 2, 3], (n) => n === 4);
 * // => Error: Item not found.
 * ```
 */
export function find<T>(array: T[], predicate: (item: T, index: number, array: T[]) => boolean): T {
  const index = array.findIndex(predicate);

  if (index === -1) {
    throw new Error('Item not found.');
  }

  return array[index];
}
