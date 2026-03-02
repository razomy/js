/**
 * Check if the string is null, undefined, or empty (including whitespace).
 * @param {string | null | undefined} str The string to check.
 * @returns {boolean} True if the string is null, undefined, or empty.
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
 */
export function isNullOrEmpty(str: string | null | undefined): str is null | undefined | '' {
  return str == null || str.trim() === '';
}
