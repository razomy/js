/**
 * Split string by newline characters.
 * @param text - The string to split.
 * @returns An array of lines.
 * @example
 * ```ts
 * // => ['Line 1', 'Line 2']
 * splitLines('Line 1\nLine 2');
 * @example
 * ```ts
 * // => ['A', 'B', 'C']
 * splitLines('A\r\nB\nC');
 * @example
 * ```ts
 * // => ['One']
 * splitLines('One');
 */
export function splitLines(text: string): string[] {
  return text.split(/\r\n|\r|\n/);
}
