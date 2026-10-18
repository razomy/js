/**
 * @summary Checks if a string contains a specific substring.
 * @description Checks if a string contains a specific substring.
 * @param text The string to inspect.
 * @param search The substring to search for.
 * @returns True if the string contains the substring, false otherwise.
 * @example
 * ```ts
 * contains('razomy', 'zo'); // => true
 * ```
 * @example
 * ```ts
 * contains('razomy', 'bar'); // => false
 * ```
 * @example
 * ```ts
 * contains('hello world', 'hello'); // => true
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function contains(text: string, search: string): boolean {
  return text.includes(search);
}
