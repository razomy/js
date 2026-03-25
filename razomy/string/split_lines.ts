/**
 * @summary Split string by newline characters.
 * @description Split string by newline characters.
 * @param text - The string to split.
 * @returns An array of lines.
 * @example
 * ```ts
 * splitLines('Line 1\nLine 2'); // => ['Line 1', 'Line 2']
 * ```
 * @example
 * ```ts
 * splitLines('A\r\nB\nC'); // => ['A', 'B', 'C']
 * ```
 * @example
 * ```ts
 * splitLines('One'); // => ['One']
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function splitLines(text: string): string[] {
  return text.split(/\r\n|\r|\n/);
}
