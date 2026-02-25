/**
 * Reverses an array in place.
 * @param array The array to reverse.
 * @returns The reversed array.
 * @example
 * ```ts
 * const array = [1, 2, 3];
 * reverseMut(array);
 * array; // => [3, 2, 1]
 * ```
 * @example
 * ```ts
 * const array = ['a', 'b'];
 * reverseMut(array);
 * array; // => ['b', 'a']
 * ```
 */
export function reverseMut<T>(array: T[]): T[] {
  return array.reverse();
}
