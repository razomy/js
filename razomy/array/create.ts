/**
 * @summary Create an array of specific size filled with a value.
 * @description Create an array of specific size filled with a value.
 * @param size The size of the array.
 * @param value The value to fill the array with.
 * @returns The created array.
 * @example
 * ```ts
 * create(3, 0); // => [0, 0, 0]
 * ```
 * @example
 * ```ts
 * create(2, 'x'); // => ['x', 'x']
 * ```
 * @example
 * ```ts
 * create(4, true); // => [true, true, true, true]
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function create<T>(size: number, value: T): T[] {
  return new Array(size).fill(value);
}
