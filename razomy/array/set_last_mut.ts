/**
 * @summary Sets the value of the last element of an array mutably, with an optional offset.
 * @description Sets the value of the last element of an array mutably, with an optional offset.
 * @param array The array to mutate.
 * @param value The value to assign.
 * @param offset The offset from the last index.
 * @returns The mutated array.
 * @example
 * ```ts
 * setLastMut([1, 2, 3], 4); // => [1, 2, 4]
 * ```
 * @example
 * ```ts
 * setLastMut(['a', 'b'], 'c'); // => ['a', 'c']
 * ```
 * @example
 * ```ts
 * setLastMut([1, 2, 3], 5, -1); // => [1, 5, 3]
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function setLastMut<T>(array: T[], value: T, offset: number = 0): T[] {
  array[array.length - 1 + offset] = value;
  return array;
}
