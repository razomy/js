/**
 * Create an array of specific size filled with a value.
 * @param {number} size The size of the array.
 * @param {T} value The value to fill the array with.
 * @returns {T[]} The created array.
 * @example
 * // => [0, 0, 0]
 * create(3, 0);
 * @example
 * // => ['x', 'x']
 * create(2, 'x');
 * @example
 * // => [true, true, true, true]
 * create(4, true);
 */
export function create<T>(size: number, value: T): T[] {
  return new Array(size).fill(value);
}