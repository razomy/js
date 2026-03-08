/**
 * @summary Convert any value to a string.
 * @param {unknown} value The value to convert.
 * @returns The string representation of the value.
 * @example
 * ```ts
 * string(100); // => '100'
 * ```
 * @example
 * ```ts
 * string(true); // => 'true'
 * ```
 * @example
 * ```ts
 * string(null); // => 'null'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function create(value: unknown): string {
  return String(value);
}

export type String = string;
