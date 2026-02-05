import {create} from './create';

/**
 * Create an array of a specific size with the value 1 at the specified index.
 * @param {number} index The index where the value 1 will be placed.
 * @param {number} size The length of the created array.
 * @returns {number[]} An array containing 1 at the specified index.
 * @example
 * // => [1, undefined]
 * indexSizeCreate(0, 2);
 * @example
 * // => [undefined, 1, undefined]
 * indexSizeCreate(1, 3);
 * @example
 * // => [undefined, undefined, undefined, 1]
 * indexSizeCreate(3, 4);
 */
export function indexSizeCreate(index: number, size: number): number[] {
  const array = create(size, 0);
  array[index] = 1;
  return array;
}