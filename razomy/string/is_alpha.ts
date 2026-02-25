/**
 * Checks if the string contains only alphabetic characters.
 * @param text The string to check.
 * @returns True if the string is alphabetic.
 * @example
 * ```ts
 * // => true
 * isAlpha('Razomy');
 * @example
 * ```ts
 * // => false
 * isAlpha('R4zomy');
 * @example
 * ```ts
 * // => false
 * isAlpha('');
 */
export function isAlpha(text: string): boolean {
  return /^[a-zA-Z]+$/.test(text);
}
