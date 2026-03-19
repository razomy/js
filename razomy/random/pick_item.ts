import * as random from "@razomy/random";

/**
 * @summary Pick a random item from a non-empty array.
 * @description Selects and returns a single random element from the provided array using a uniform random integer generator.
 * @param array A non-empty readonly array of items.
 * @returns A randomly selected item from the array.
 * @throws {RangeError} If the array is empty.
 * @example
 * ```ts
 * pickItem([1, 2, 3]); // => 2 (random)
 * ```
 * @example
 * ```ts
 * pickItem(['a', 'b', 'c', 'd']); // => 'c' (random)
 * ```
 * @example
 * ```ts
 * pickItem([true]); // => true
 * ```
 * @complexity time O(1)
 * @complexity memory O(1)
 */
export function pickItem<T>(array: readonly T[]): T {
  if (array.length === 0) {
    throw new RangeError('Cannot pick an item from an empty array');
  }

  return array[random.createInt(0, array.length - 1)];
}
