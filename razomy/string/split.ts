/**
 * @summary Split string by splitter characters.
 * @description Split string by splitter characters.
 * @param text - The string to split.
 * @param splitter An object that can split a string.
 * @param limit A value used to limit the number of elements returned in the array.
 * @returns An array of lines.
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
