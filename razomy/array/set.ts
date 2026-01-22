/**
 * Creates a new array with the element at the specified index replaced with the given value.
 * @param {readonly T[]} array The source array.
 * @param {number} index The zero-based index at which to replace the value, converted to an integer. Negative index counts from the end of the array.
 * @param {T} value The value to insert into the new array.
 * @returns {T[]} A new array with the element at the index replaced.
 * @throws {RangeError} Throws if the index is out of bounds (index < -array.length or index >= array.length).
 * @example
 * // => ['a', 'x', 'c']
 * set(['a', 'b', 'c'], 1, 'x');
 * @example
 * // => [1, 2, 99]
 * set([1, 2, 3], -1, 99);
 * @example
 * // => [0, 0, 0]
 * set([0, 1, 0], 1, 0);
 */
export function set<T>(array: readonly T[], index: number, value: T): T[] {
  return array.with(index, value);
}