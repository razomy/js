/**
 * Converts a string to lower case.
 * @param input - The string to convert.
 * @returns The lower cased string.
 * @example
 * // => 'razomy'
 * lowerCase('RAZOMY');
 * @example
 * // => 'test'
 * lowerCase('Test');
 * @example
 * // => 'foo bar'
 * lowerCase('FOO Bar');
 */
export function lowerCase(input: string): string {
  return input.toLowerCase();
}