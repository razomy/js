import type { String } from '@razomy/string';

/**
 * Check if the value is a string.
 * @param value The value to check.
 * @returns True if the value is a string.
 * @example
 * ```ts
 * // => true
 * isString('razomy');
 * @example
 * ```ts
 * // => false
 * isString(123);
 * @example
 * ```ts
 * // => false
 * isString(null);
 */
export function isString(value: unknown): value is String {
  return typeof value === 'string';
}
