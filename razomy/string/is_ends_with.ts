/**
 * @summary Checks if string ends with the given target string.
 * @description Checks if string ends with the given target string.
 * @param text The string to inspect.
 * @param target The string to search for.
 * @param position The position to search up to.
 * @returns Returns true if string ends with target, else false.
 * @example
 * ```ts
 * isEndsWith('abc', 'c'); // => true
 * ```
 * @example
 * ```ts
 * isEndsWith('abc', 'b'); // => false
 * ```
 * @example
 * ```ts
 * isEndsWith('abc', 'b', 2); // => true
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function isEndsWith(text: string, target: string, position?: number): boolean {
  return text.endsWith(target, position);
}
