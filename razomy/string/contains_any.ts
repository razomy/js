/**
 * @summary Checks if a string contains any of the specified substrings.
 * @description Checks if the input string contains at least one of the substrings provided in the search array.
 * @param text The main string to inspect.
 * @param search An array of strings to search for within the text.
 * @returns True if the string contains at least one of the search substrings, false otherwise.
 * @example
 * ```ts
 * containsAny('razomy', ['zo']); // => true
 * ```
 * @example
 * ```ts
 * containsAny('razomy', ['bar']); // => false
 * ```
 * @example
 * ```ts
 * containsAny('hello world', ['hello']); // => true
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function containsAny(text: string, search: string[]): boolean {
  return search.some(s => text.includes(s));
}
