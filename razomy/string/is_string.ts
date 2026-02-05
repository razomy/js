import {String} from '@razomy/string';

/**
 * Check if the value is a string.
 * @param value The value to check.
 * @returns True if the value is a string.
 * @example
 * // => true
 * isString('razomy');
 * @example
 * // => false
 * isString(123);
 * @example
 * // => false
 * isString(null);
 */
export function isString(value: unknown): value is String {
  return typeof value === 'string';
}