/**
 * Checks if the string is lower case.
 * @param text The string to check.
 * @returns True if the string is lower case, false otherwise.
 * @example
 * // => true
 * isLowerCase('razomy');
 * @example
 * // => false
 * isLowerCase('Razomy');
 * @example
 * // => true
 * isLowerCase('string with 123');
 */
export function isLowerCase(text: string): boolean {
  return text === text.toLowerCase();
}