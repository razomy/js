/**
 * Reverses the given string.
 * @param value The string to reverse.
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
 */
export function reverse(value: string): string {
  return [...value].reverse().join('');
}