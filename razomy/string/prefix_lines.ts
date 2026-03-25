/**
 * @summary Add margin to every line of the string.
 * @description Add margin to every line of the string.
 * @param text The input text.
 * @param prefix The margin string to prepend.
 * @returns The text with margin applied.
 * @example
 * ```ts
 * prefixLines('Hello', '  '); // => '  Hello'
 * ```
 * @example
 * ```ts
 * prefixLines('Line 1\nLine 2', '> '); // => '> Line 1\n> Line 2'
 * ```
 * @example
 * ```ts
 * prefixLines('Code', '\t'); // => '\tCode'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function prefixLines(text: string, prefix: string): string {
  return text.replace(/^/gm, prefix);
}
