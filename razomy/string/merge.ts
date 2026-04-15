/**
 * @summary Merge an array of strings into a single string.
 * @description Concatenates all strings in the provided array together in order, returning a single merged string.
 * @param strings The array of strings to merge.
 * @returns The merged string.
 * @example
 * ```ts
 * merge(['a', 'b', 'c']); // => 'abc'
 * ```
 * @example
 * ```ts
 * merge(['hello', ' ', 'world']); // => 'hello world'
 * ```
 * @example
 * ```ts
 * merge([]); // => ''
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function merge(strings: string[]): string {
  return strings.join('');
}
