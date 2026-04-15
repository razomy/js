/**
 * @summary Check if a string is upper case.
 * @description Determines whether the given string is entirely in upper case by comparing it to its upper-cased transformation. Returns true only if every character in the string is already upper case (i.e., the string is identical to the result of calling `toUpperCase()` on it).
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
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function isUpperCase(text: string): boolean {
  return text === text.toUpperCase();
}
