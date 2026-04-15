/**
 * @summary Converts a string to lower case.
 * @description Converts all characters in the given string to their lower case equivalents using the built-in `toLowerCase` method. The original string is not modified; a new lower cased string is returned.
 * @param text - The string to convert.
 * @returns The lower cased string.
 * @example
 * ```ts
 * lowerCase('RAZOMY'); // => 'razomy'
 * ```
 * @example
 * ```ts
 * lowerCase('Test'); // => 'test'
 * ```
 * @example
 * ```ts
 * lowerCase('FOO Bar'); // => 'foo bar'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function lowerCase(text: string): string {
  return text.toLowerCase();
}
