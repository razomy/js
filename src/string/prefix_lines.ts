/**
 * @summary Add margin to every line of the string.
 * @description Adds a specified prefix to the beginning of every line in the input string.
 * @param text The input string to be prefixed.
 * @param prefix The string to prepend to the beginning of each line.
 * @returns The string with the prefix applied to every line.
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
