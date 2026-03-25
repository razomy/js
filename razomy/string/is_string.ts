import * as string from '@razomy/string';

/**
 * @summary Check if the value is a string.
 * @description Check if the value is a string.
 * @param value The value to check.
 * @returns True if the value is a string.
 * @example
 * ```ts
 * isString('razomy'); // => true
 * ```
 * @example
 * ```ts
 * isString(123); // => false
 * ```
 * @example
 * ```ts
 * isString(null); // => false
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function isString(value: unknown): value is string.String {
  return typeof value === 'string';
}
