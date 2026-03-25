/**
 * @summary Check if the string is null, undefined, or empty (including whitespace).
 * @description Check if the string is null, undefined, or empty (including whitespace).
 * @param str The string to check.
 * @returns True if the string is null, undefined, or empty.
 * @example
 * ```ts
 * isNullOrEmpty(null); // => true
 * ```
 * @example
 * ```ts
 * isNullOrEmpty('   '); // => true
 * ```
 * @example
 * ```ts
 * isNullOrEmpty('razomy'); // => false
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function isNullOrEmpty(str: string | null | undefined): str is null | undefined | '' {
  return str == null || str.trim() === '';
}
