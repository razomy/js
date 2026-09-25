/**
 * @summary Removes the smallest common leading whitespace (indent) from all lines.
 * @description Finds the minimum indentation among all non-empty lines and removes exactly that many space/tab characters from the beginning of every line.
 * @param text - The multiline string to dedent.
 * @returns The string with the common indent removed.
 * @example
 * ```ts
 * // Removes 2 spaces from all lines
 * trimIndent('  foo\n    bar\n  baz'); // => 'foo\n  bar\nbaz'
 * ```
 * @example
 * ```ts
 * // Ignores empty lines when calculating the minimum indent
 * trimIndent('    foo\n\n      bar'); // => 'foo\n\n  bar'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function trimIndent(text: string): string {
    const lines = text.split('\n');
    const indents = lines
            .filter((line) => line.trim().length > 0)
            .map((line) => {
              const match = line.match(/^[ \t]*/);
              return match ? match[0].length : 0;
            });
    const minIndent = indents.length > 0 ? Math.min(...indents) : 0;
    if (minIndent === 0) {
    return text;
    }

    return lines.map((line) => line.slice(minIndent)).join('\n');
}
