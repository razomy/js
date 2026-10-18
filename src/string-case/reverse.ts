/**
 * @summary Reverses the given string.
 * @description Reverses the order of characters in the given string by spreading it into an array of individual characters,
 * reversing the array, and joining the characters back into a string. This approach correctly handles multi-byte
 * Unicode characters (such as emojis) by using the spread operator, which splits on code points rather than code units.
 * @param text The string to reverse.
 * @returns The reversed string.
 * @example
 * ```ts
 * reverse('abc'); // => 'cba'
 * ```
 * @example
 * ```ts
 * reverse('qwerty'); // => 'ytrewq'
 * ```
 * @example
 * ```ts
 * reverse('123'); // => '321'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function reverse(text: string): string {
  return [...text].reverse().join('');
}
