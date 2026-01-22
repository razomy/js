/**
 * Check if the string is null, undefined, or empty (including whitespace).
 * @param {string | null | undefined} str The string to check.
 * @returns {boolean} True if the string is null, undefined, or empty.
 * @example
 * // => true
 * isNullOrEmpty(null);
 * @example
 * // => true
 * isNullOrEmpty('   ');
 * @example
 * // => false
 * isNullOrEmpty('razomy');
 */
export function isNullOrEmpty(
  str: string | null | undefined,
): str is null | undefined | '' {
  return str == null || str.trim() === '';
}