/**
 * @summary Retrieves the last element of an array or an element relative to the end.
 * @description Returns null if the index is out of bounds.
 * @param arr The input array.
 * @param deltaIndex The offset from the end (defaults to 0).
 * @returns {T | null} The element or null.
 * @example
 * ```ts
 * tryGetLast(['a', 'b', 'c']); // => 'c'
 * ```
 * @example
 * ```ts
 * tryGetLast(['a', 'b', 'c'], -1);
 * // => 'b'
 * ```
 * @example
 * ```ts
 * tryGetLast([]); // => null
 * ```
 */
export function tryGetLast<T>(arr: T[], deltaIndex: number = 0): T | null {
  return arr.at(-1 + deltaIndex) ?? null;
}
