/**
 * @summary Add margin to every line of the string except empty.
 * @description Adds a specified prefix to the beginning of every line in the input string.
 * @param text The input string to be prefixed.
 * @param prefix The string to prepend to the beginning of each line.
 * @returns The string with the prefix applied to every line.
 * @example
 * ```ts
 * prefixLinesAndSkipEmpty('Hello', '  '); // => '  Hello'
 * ```
 * @example
 * ```ts
 * prefixLinesAndSkipEmpty('Line 1\n\nLine 2', '> '); // => '> Line 1\n\n> Line 2'
 * ```
 * @example
 * ```ts
 * prefixLinesAndSkipEmpty('Code', '\t'); // => '\tCode'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function prefixLinesAndSkipEmpty(text: string, prefix: string): string {
    return text.replace(/^(?!$)/gm, prefix);
}
