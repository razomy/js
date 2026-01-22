/**
 * Checks if string starts with the given target string.
 * @param string The string to inspect.
 * @param target The string to search for.
 * @param position The position to search from.
 * @returns Returns true if string starts with target, else false.
 * @example
 * // => true
 * startsWith('razomy', 'r');
 * @example
 * // => false
 * startsWith('razomy', 'z');
 * @example
 * // => true
 * startsWith('razomy', 'z', 2);
 */
export function startsWith(string: string, target: string, position: number = 0): boolean {
  return string.startsWith(target, position);
}