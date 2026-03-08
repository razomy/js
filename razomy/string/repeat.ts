/**
 * @summary Repeats a string a specified number of times.
 * @param content The string to repeat.
 * @param count The number of times to repeat the string.
 * @returns A new string containing the specified number of copies.
 * @example
 * ```ts
 * repeat('a', 3); // => 'aaa'
 * ```
 * @example
 * ```ts
 * repeat('razomy', 2); // => 'razomyrazomy'
 * ```
 * @example
 * ```ts
 * repeat('test', 0); // => ''
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function repeat(content: string, count: number): string {
  return content.repeat(count);
}
