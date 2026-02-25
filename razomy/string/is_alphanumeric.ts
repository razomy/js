/**
 * Check if the string contains only alphanumeric characters.
 * @param text The text to check.
 * @returns True if the string is alphanumeric.
 * @example
 * ```ts
 * // => true
 * isAlphanumeric('Razomy1');
 * @example
 * ```ts
 * // => false
 * isAlphanumeric('Razomy-String');
 * @example
 * ```ts
 * // => false
 * isAlphanumeric(' ');
 */
export function isAlphanumeric(text: string): boolean {
  return /^[a-z0-9]+$/i.test(text);
}
