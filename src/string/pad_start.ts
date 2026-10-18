/**
 * @summary Pads the start of a string with another string until it reaches the given length.
 * @description Pads the start of a string with another string until it reaches the given length.
 * @param input The string to pad.
 * @param length The target length of the resulting string.
 * @param chars The string to pad with. Defaults to space.
 * @returns The padded string.
 * @example
 * ```ts
 * padStart('a', 3); // => '  a'
 * ```
 * @example
 * ```ts
 * padStart('a', 3, '0'); // => '00a'
 * ```
 * @example
 * ```ts
 * padStart('abc', 2); // => 'abc'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function padStart(input: string, length: number, chars: string = ' '): string {
  return input.padStart(length, chars);
}
