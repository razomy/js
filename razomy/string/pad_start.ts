/**
 * Pads the start of a string with another string until it reaches the given length.
 * @param input The string to pad.
 * @param length The target length of the resulting string.
 * @param chars The string to pad with. Defaults to space.
 * @returns The padded string.
 * @example
 * ```ts
 * // => '  a'
 * padStart('a', 3);
 * @example
 * ```ts
 * // => '00a'
 * padStart('a', 3, '0');
 * @example
 * ```ts
 * // => 'abc'
 * padStart('abc', 2);
 */
export function padStart(input: string, length: number, chars: string = ' '): string {
  return input.padStart(length, chars);
}
