/**
 * Retrieves the last element of an array or an element relative to the end.
 * Returns null if the index is out of bounds.
 * @param {T[]} arr The input array.
 * @param {number} deltaIndex The offset from the end (defaults to 0).
 * @returns {T | null} The element or null.
 * @example
 * // => 'c'
 * tryGetLast(['a', 'b', 'c']);
 * @example
 * // => 'b'
 * tryGetLast(['a', 'b', 'c'], -1);
 * @example
 * // => null
 * tryGetLast([]);
 */
export function tryGetLast<T>(arr: T[], deltaIndex: number = 0): T | null {
  return arr.at(-1 + deltaIndex) ?? null;
}