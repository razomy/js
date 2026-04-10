/**
 * @summary Truncates string if it's longer than the given maximum string length.
 * @description Truncates the input string to a specified length, appending an omission string if truncation occurs.
 * @param text The string to truncate.
 * @param length The maximum desired length of the resulting string (excluding the omission string).
 * @param omission The string to be appended to indicate truncation. Defaults to '...'.
 * @returns The truncated string.
 * @example
 * ```ts
 * truncate('hello world', 5); // => 'he...'
 * ```
 * @example
 * ```ts
 * truncate('hello', 10); // => 'hello'
 * ```
 * @example
 * ```ts
 * truncate('hello world', 7, '...'); // => 'hello...'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function truncate(text: string, length: number, omission: string = '...'): string {
  if (text.length <= length) {
    return text;
  }

  return text.slice(0, length - omission.length) + omission;
}
