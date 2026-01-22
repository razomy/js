/**
 * Check if a string is upper case.
 * @param {string} text The string to check.
 * @returns {boolean} True if the string is upper case.
 * @example
 * // => true
 * isUpperCase('HELLO');
 * @example
 * // => false
 * isUpperCase('Hello');
 * @example
 * // => false
 * isUpperCase('hello');
 */
export function isUpperCase(text: string): boolean {
  return text === text.toUpperCase();
}