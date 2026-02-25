/**
 * Convert any value to a string.
 * @param {unknown} value The value to convert.
 * @returns {string} The string representation of the value.
 * @example
 * ```ts
 * // => '100'
 * string(100);
 * @example
 * ```ts
 * // => 'true'
 * string(true);
 * @example
 * ```ts
 * // => 'null'
 * string(null);
 */
export function string(value: unknown): string {
  return String(value);
}

export type String = string;
