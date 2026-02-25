/**
 * Creates a new array with the element at the specified index replaced with the given value.
 * @param {readonly T[]} array The source array.
 * @param index The zero-based index at which to replace the value, converted to an integer. Negative index counts from the end of the array.
 * @param value The value to insert into the new array.
 * @returns A new array with the element at the index replaced.
 * @throws {RangeError} Throws if the index is out of bounds (index < -array.length or index >= array.length).
 * @example
 * ```ts
 * set(['a', 'b', 'c'], 1, 'x'); // => ['a', 'x', 'c']
 * ```
 * @example
 * ```ts
 * set([1, 2, 3], -1, 99);
 * // => [1, 2, 99]
 * ```
 * @example
 * ```ts
 * set([0, 1, 0], 1, 0); // => [0, 0, 0]
 * ```
 */
export function set<T>(array: readonly T[], index: number, value: T): T[] {
  return array.with(index, value);
}
