/**
 * Checks if the string is lower case.
 * @param text The string to check.
 * @returns True if the string is lower case, false otherwise.
 * @example
 * ```ts
 * isLowerCase('razomy'); // => true
 * ```
 * @example
 * ```ts
 * isLowerCase('Razomy'); // => false
 * ```
 * @example
 * ```ts
 * isLowerCase('string with 123'); // => true
 * ```
 */
export function isLowerCase(text: string): boolean {
  return text === text.toLowerCase();
}