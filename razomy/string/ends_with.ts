/**
 * Checks if string ends with the given target string.
 * @param text The string to inspect.
 * @param target The string to search for.
 * @param position The position to search up to.
 * @returns Returns true if string ends with target, else false.
 * @example
 * // => true
 * endsWith('abc', 'c');
 * @example
 * // => false
 * endsWith('abc', 'b');
 * @example
 * // => true
 * endsWith('abc', 'b', 2);
 */
export function endsWith(text: string, target: string, position?: number): boolean {
  return text.endsWith(target, position);
}

