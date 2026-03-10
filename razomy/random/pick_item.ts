/**
 * @summary Pick a random item from an array.
 * @description Selects and returns a uniformly random element from the given array. Throws if the array is empty.
 * @param array The non-empty array to pick from.
 * @returns A randomly selected element from the array.
 * @throws {RangeError} If the array is empty.
 * @example
 * ```ts
 * pickItem([10, 20, 30]); // => 10 | 20 | 30
 * ```
 * @example
 * ```ts
 * pickItem(['a', 'b']); // => 'a' | 'b'
 * ```
 * @example
 * ```ts
 * pickItem([true]); // => true
 * ```
 * @complexity time O(1)
 * @complexity memory O(1)
 */
import { createInt } from '@razomy/random';

export function pickItem<T>(array: readonly T[]): T {
  if (array.length === 0) {
    throw new RangeError('Cannot pick an item from an empty array');
  }

  return array[createInt(0, array.length - 1)];
}
