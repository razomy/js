/**
 * Add margin to every line of the string.
 * @param {string} text The input text.
 * @param {string} margin The margin string to prepend.
 * @returns {string} The text with margin applied.
 * @example
 * ```ts
 * // => '  Hello'
 * marginString('Hello', '  ');
 * @example
 * ```ts
 * // => '> Line 1\n> Line 2'
 * marginString('Line 1\nLine 2', '> ');
 * @example
 * ```ts
 * // => '\tCode'
 * marginString('Code', '\t');
 */
export function marginString(text: string, margin: string): string {
  const lines = text.split('\n');
  const shiftedLines = lines.map((line) => margin + line);
  return shiftedLines.join('\n');
}
