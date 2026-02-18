/**
 * Generates a random string of specified length using optional custom characters.
 * @param length The length of the resulting string.
 * @param characters The set of characters to generate from.
 * @returns The generated random string.
 * @example
 * // => 'X7z'
 * randomString(3);
 * @example
 * // => '10101'
 * randomString(5, '01');
 * @example
 * // => 'aaaa'
 * randomString(4, 'a');
 */
export function randomString(length: number, characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string {
  let result: string = '';
  const charactersLength: number = characters.length;
  for (let i: number = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}