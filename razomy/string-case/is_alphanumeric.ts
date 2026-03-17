/**
 * @summary Check if the string contains only alphanumeric characters.
 * @description Tests whether the given string consists exclusively of alphanumeric characters (letters a-z, A-Z and digits 0-9) using a regular expression. Returns false for empty strings, strings containing spaces, special characters, or any non-alphanumeric content.
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