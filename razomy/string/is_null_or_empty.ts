/**
 * @summary Check if the string is null, undefined, or empty (including whitespace).
 * @description Checks if the string is null, undefined, or empty after trimming whitespace.
 * @param str The string to check.
 * @returns True if the string is null, undefined, or consists only of whitespace.
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
