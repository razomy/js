/**
 * Reverses the given string.
 * @param value The string to reverse.
 * @returns The reversed string.
 * @example
 * // => 'cba'
 * reverse('abc');
 * @example
 * // => 'ytrewq'
 * reverse('qwerty');
 * @example
 * // => '321'
 * reverse('123');
 */
export function reverse(value: string): string {
  return [...value].reverse().join('');
}