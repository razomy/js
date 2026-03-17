/**
 * @summary Converts the first character of string to upper case and the remaining to lower case.
 * @description Takes an input string and returns a new string where the first character is converted to upper case and all remaining characters are converted to lower case. This is useful for normalizing the casing of words regardless of their original casing.
 * @param text The string to capitalize.
 * @returns The capitalized string.
 * @example
 * ```ts
 * capitalize('razomy'); // => 'Razomy'
 * ```
 * @example
 * ```ts
 * capitalize('RAZOMY'); // => 'Razomy'
 * ```
 * @example
 * ```ts
 * capitalize('rAZOMY'); // => 'Razomy'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
