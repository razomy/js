/**
 * Convert any value to a string.
 * @param {unknown} value The value to convert.
 * @returns {string} The string representation of the value.
 * @example
 * // => '100'
 * string(100);
 * @example
 * // => 'true'
 * string(true);
 * @example
 * // => 'null'
 * string(null);
 */
export function string(value: unknown): string {
  return String(value);
}
export type String = string;