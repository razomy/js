/**
 * Converts the first character of string to upper case and the remaining to lower case.
 * @param {string} text The string to capitalize.
 * @returns {string} The capitalized string.
 * @example
 * // => 'Razomy'
 * capitalize('razomy');
 * @example
 * // => 'Razomy'
 * capitalize('RAZOMY');
 * @example
 * // => 'Razomy'
 * capitalize('rAZOMY');
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}