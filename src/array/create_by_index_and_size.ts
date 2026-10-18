import * as array_ from '@razomy/array';

/**
 * @summary Create an array of a specific size with the value 1 at the specified index.
 * @description Create an array of a specific size with the value 1 at the specified index.
 * @param index The index where the value 1 will be placed.
 * @param size The length of the created array.
 * @returns An array containing 1 at the specified index.
 * @example
 * ```ts
 * createByIndexAndSize(0, 2); // => [1, 0]
 * ```
 * @example
 * ```ts
 * createByIndexAndSize(1, 3); // => [0, 1, 0]
 * ```
 * @example
 * ```ts
 * createByIndexAndSize(3, 4); // => [0, 0, 0, 1]
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function createByIndexAndSize(index: number, size: number): number[] {
  const array = array_.create(size, 0);
  array[index] = 1;
  return array;
}
