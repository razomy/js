import type { String } from '@razomy/string';

/**
 * Check if the value is a string.
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
 */
export function isString(value: unknown): value is String {
  return typeof value === 'string';
}
