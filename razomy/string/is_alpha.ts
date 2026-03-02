/**
 * Checks if the string contains only alphabetic characters.
 * @param text The string to check.
 * @returns True if the string is alphabetic.
 * @example
 * ```ts
 * isAlpha('Razomy'); // => true
 * ```
 * @example
 * ```ts
 * isAlpha('R4zomy'); // => false
 * ```
 * @example
 * ```ts
 * isAlpha(''); // => false
 * ```
 */
export function isAlpha(text: string): boolean {
  return /^[a-zA-Z]+$/.test(text);
}
