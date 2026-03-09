/**
 * @summary Inserts an item into an array at the specified index by mutating the array.
 * @param array The array to mutate.
 * @param index The index at which to insert the item.
 * @param item The item to insert.
 * @returns The mutated array.
 * @example
 * ```ts
 * insertMut([1, 3], 1, 2); // => [1, 2, 3]
 * ```
 * @example
 * ```ts
 * insertMut(['a', 'c'], 1, 'b'); // => ['a', 'b', 'c']
 * ```
 * @example
 * ```ts
 * insertMut([{ id: 1 }], 1, { id: 2 });
 * // => [{ id: 1 }, { id: 2 }]
 * ```
 */
export function insertMut<T>(array: T[], index: number, item: T): T[] {
  array.splice(index, 0, item);
  return array;
}
