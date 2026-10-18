/**
 * @summary Check if a value is an array.
 * @description Determines whether the provided value is an array using `Array.isArray`.
 * @param value The value to check.
 * @returns `true` if the value is an array, `false` otherwise.
 * @example
 * ```ts
 * isArray([1, 2, 3]); // => true
 * ```
 * @example
 * ```ts
 * isArray('hello'); // => false
 * ```
 * @example
 * ```ts
 * isArray([]); // => true
 * ```
 * @complexity time O(1)
 * @complexity memory O(1)
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}
