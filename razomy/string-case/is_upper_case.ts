/**
 * Check if a string is upper case.
 * @param text The string to check.
 * @returns True if the string is upper case.
 * @example
 * ```ts
 * isUpperCase('HELLO'); // => true
 * ```
 * @example
 * ```ts
 * isUpperCase('Hello'); // => false
 * ```
 * @example
 * ```ts
 * isUpperCase('hello'); // => false
 * ```
 */
export function isUpperCase(text: string): boolean {
  return text === text.toUpperCase();
}
