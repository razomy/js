/**
 * @summary Add margin to every line of the string.
 * @param text The input text.
 * @param margin The margin string to prepend.
 * @returns The text with margin applied.
 * @example
 * ```ts
 * marginString('Hello', '  '); // => '  Hello'
 * ```
 * @example
 * ```ts
 * marginString('Line 1\nLine 2', '> '); // => '> Line 1\n> Line 2'
 * ```
 * @example
 * ```ts
 * marginString('Code', '\t'); // => '\tCode'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function margin(text: string, margin: string): string {
  const lines = text.split('\n');
  const shiftedLines = lines.map((line) => margin + line);
  return shiftedLines.join('\n');
}
