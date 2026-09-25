/**
 * @summary Removes whitespace from both ends of each line in the string.
 * @description Splits the string into lines, removes whitespace from both ends of every line, and joins them back together.
 * @param text - The multiline string to process.
 * @returns The string with trimmed lines.
 * @example
 * ```ts
 * trimLines('  foo  \n  bar  '); // => 'foo\nbar'
 * ```
 * @example
 * ```ts
 * trimLines('\tline 1\r\n  line 2 \n'); // => 'line 1\nline 2\n'
 * ```
 * @example
 * ```ts
 * trimLines('   \n  '); // => '\n'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function trimLines(text: string): string {
    return text.split('\n').map((line) => line.trim()).join('\n');
}
