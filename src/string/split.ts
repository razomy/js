/**
 * @summary Split string by a given delimiter.
 * @description Splits a string based on a specified splitter (string or RegExp) and an optional limit on the number of resulting elements.
 * @param text The string to be split.
 * @param splitter The delimiter to use for splitting. Can be a string or a RegExp.
 * @param limit An optional number to limit the number of elements returned in the array.
 * @returns An array of strings resulting from the split operation.
 * @example
 * ```ts
 * split('Line 1\nLine 2', '\n'); // => ['Line 1', 'Line 2']
 * ```
 * @example
 * ```ts
 * split('A\nB\nC', /[\n]/); // => ['A', 'B', 'C']
 * ```
 * @example
 * ```ts
 * split('One', ''); // => ['O','n','e']
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function split(text: string, splitter: string | RegExp, limit?: number): string[] {
  return text.split(splitter, limit);
}
