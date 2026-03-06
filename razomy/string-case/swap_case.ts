/**
 * @summary Convert string by swapping the case of every character.
 * @description Uppercase becomes lowercase, and lowercase becomes uppercase.
 * @param text The text to convert.
 * @returns The swapped case string.
 * @example
 * ```ts
 * swapCase('Hello World'); // => 'hELLO wORLD'
 * ```
 * @example
 * ```ts
 * swapCase('camelCase'); // => 'CAMELcASE'
 * ```
 * @example
 * ```ts
 * swapCase('123 ABC xyz'); // => '123 abc XYZ'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function swapCase(text: string): string {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const lower = char.toLowerCase();
    return char === lower ? char.toUpperCase() : lower;
  });
}
