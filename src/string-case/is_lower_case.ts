/**
 * @summary Checks if the string is lower case.
 * @description Determines whether the entire input string is in lower case by comparing it to its lower-cased equivalent. Non-alphabetic characters (such as digits, spaces, and symbols) do not affect the result, as they have no case and remain unchanged by the lower case conversion.
 * @param text The string to check.
 * @returns True if the string is lower case, false otherwise.
 * @example
 * ```ts
 * isLowerCase('razomy'); // => true
 * ```
 * @example
 * ```ts
 * isLowerCase('Razomy'); // => false
 * ```
 * @example
 * ```ts
 * isLowerCase('string with 123'); // => true
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function isLowerCase(text: string): boolean {
  return text === text.toLowerCase();
}
