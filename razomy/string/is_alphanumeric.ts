/**
 * Check if the string contains only alphanumeric characters.
 * @param text The text to check.
 * @returns True if the string is alphanumeric.
 * @example
 * // => true
 * isAlphanumeric('Razomy1');
 * @example
 * // => false
 * isAlphanumeric('Razomy-String');
 * @example
 * // => false
 * isAlphanumeric(' ');
 */
export function isAlphanumeric(text: string): boolean {
  return /^[a-z0-9]+$/i.test(text);
}