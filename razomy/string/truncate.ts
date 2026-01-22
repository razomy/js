/**
 * Truncates string if it's longer than the given maximum string length.
 * @param text The text to truncate.
 * @param length The maximum length of the truncated string.
 * @param omission The string to indicate text is omitted.
 * @returns The truncated string.
 * @example
 * // => 'he...'
 * truncate('hello world', 5);
 * @example
 * // => 'hello'
 * truncate('hello', 10);
 * @example
 * // => 'hello..'
 * truncate('hello world', 7, '..');
 */
export function truncate(text: string, length: number, omission: string = '...'): string {
  if (text.length <= length) {
    return text;
  }

  return text.slice(0, length - omission.length) + omission;
}