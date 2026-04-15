import * as random from "@razomy/random";

/**
 * @summary Generates a random string.
 * @description Generates a random string of specified length using optional custom characters.
 * @param length The length of the resulting string.
 * @param characters The set of characters to generate from.
 * @returns The generated random string.
 * @example
 * ```ts
 * randomString(3); // => 'X7z'
 * ```
 * @example
 * ```ts
 * randomString(5, '01'); // => '10101'
 * ```
 * @example
 * ```ts
 * randomString(4, 'a'); // => 'aaaa'
 * ```
 * @complexity time O(1)
 * @complexity memory O(1)
 */
export function createString(
  length: number = 16,
  characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
): string {
  let result: string = '';
  const charactersLength: number = characters.length;
  for (let i: number = 0; i < length; i++) {
    result += characters.charAt(Math.floor(random.createFloat() * charactersLength));
  }
  return result;
}
