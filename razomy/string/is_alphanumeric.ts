/**
 * @summary Check if the string contains only alphanumeric characters.
 * @param text The text to check.
 * @returns True if the string is alphanumeric.
 * @example
 * ```ts
 * isAlphanumeric('Razomy1'); // => true
 * ```
 * @example
 * ```ts
 * isAlphanumeric('Razomy-String'); // => false
 * ```
 * @example
 * ```ts
 * isAlphanumeric(' '); // => false
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function isAlphanumeric(text: string): boolean {
  return /^[a-z0-9]+$/i.test(text);
}
