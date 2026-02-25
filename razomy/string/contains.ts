/**
 * Checks if a string contains a specific substring.
 * @param text The string to inspect.
 * @param search The substring to search for.
 * @returns True if the string contains the substring, false otherwise.
 * @example
 * ```ts
 * // => true
 * contains('razomy', 'zo');
 * @example
 * ```ts
 * // => false
 * contains('razomy', 'bar');
 * @example
 * ```ts
 * // => true
 * contains('hello world', 'hello');
 */
export function contains(text: string, search: string): boolean {
  return text.includes(search);
}
