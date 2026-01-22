/**
 * Pads the end of a string with a given string (repeated, if needed) so that the resulting string reaches a given length.
 * @param input The string to pad.
 * @param length The target length of the resulting string.
 * @param chars The string to pad with. Defaults to space.
 * @returns The padded string.
 * @example
 * // => 'abc   '
 * padEnd('abc', 6);
 * @example
 * // => 'abc000'
 * padEnd('abc', 6, '0');
 * @example
 * // => 'abc'
 * padEnd('abc', 2);
 */
export function padEnd(input: string, length: number, chars: string = ' '): string {
  return input.padEnd(length, chars);
}