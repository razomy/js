/**
 * Retrieves the last element of an array.
 * Optionally accepts an offset to retrieve preceding elements.
 * Throws an error if the element is not found (e.g., empty array or out of bounds).
 * @template T The type of elements in the array.
 * @param {T[]} array The input array.
 * @param {number} [offset=0] The zero-based offset from the end (0 is the last item, 1 is the second to last).
 * @returns {T} The element at the calculated position.
 * @throws {Error} If the element does not exist.
 * @example
 * // => 3
 * getLast([1, 2, 3]);
 * @example
 * // => 'b'
 * getLast(['a', 'b', 'c'], 1);
 * @example
 * // => Error: Element at offset 10 does not exist.
 * getLast([1, 2, 3], 10);
 */
export function getLast<T>(array: T[], offset: number = 0): T {
  const item = array.at(-1 - offset);

  if (item === undefined) {
    throw new Error(`Element at offset ${offset} does not exist.`);
  }

  return item;
}