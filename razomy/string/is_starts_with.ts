/**
 * @summary Checks if string starts with the given target string.
 * @description Checks if string starts with the given target string.
 * @param string The string to inspect.
 * @param target The string to search for.
 * @param position The position to search from.
 * @returns Returns true if string starts with target, else false.
 * @example
 * ```ts
 * isStartsWith('razomy', 'r'); // => true
 * ```
 * @example
 * ```ts
 * isStartsWith('razomy', 'z'); // => false
 * ```
 * @example
 * ```ts
 * isStartsWith('razomy', 'z', 2); // => true
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function isStartsWith(string: string, target: string, position: number = 0): boolean {
  return string.startsWith(target, position);
}
