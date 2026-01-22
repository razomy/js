/**
 * Repeats a string a specified number of times.
 * @param content The string to repeat.
 * @param count The number of times to repeat the string.
 * @returns A new string containing the specified number of copies.
 * @example
 * // => 'aaa'
 * repeat('a', 3);
 * @example
 * // => 'razomyrazomy'
 * repeat('razomy', 2);
 * @example
 * // => ''
 * repeat('test', 0);
 */
export function repeat(content: string, count: number): string {
  return content.repeat(count);
}