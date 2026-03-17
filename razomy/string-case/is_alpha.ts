/**
 * @summary Checks if the string contains only alphabetic characters.
 * @description Determines whether the given string consists exclusively of alphabetic characters (a-z, A-Z). Returns `false` for empty strings, strings containing digits, whitespace, special characters, or any non-alphabetic characters. The check is performed using a regular expression that matches one or more alphabetic characters spanning the entire string.
 * @param text The string to check.
 * @returns True if the string is alphabetic.
 * @example
 * ```ts
 * isAlpha('Razomy'); // => true
 * ```
 * @example
 * ```ts
 * isAlpha('R4zomy'); // => false
 * ```
 * @example
 * ```ts
 * isAlpha(''); // => false
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function isAlpha(text: string): boolean {
  return /^[a-zA-Z]+$/.test(text);
}