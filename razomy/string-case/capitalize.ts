/**
 * @summary Converts the first character of string to upper case and the remaining to lower case.
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
