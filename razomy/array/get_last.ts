/**
 * @summary Retrieves the last element of an array.
 * @description Optionally accepts an offset to retrieve preceding elements.
 * Throws an error if the element is not found (e.g., empty array or out of bounds).
 * @template T The type of elements in the array.
 * @param array The input array.
 * @param offset The zero-based offset from the end (0 is the last item, 1 is the second to last).
 * @returns The element at the calculated position.
 * @throws {Error} If the element does not exist.
 * @example
 * ```ts
 * getLast([1, 2, 3]); // => 3
 * ```
 * @example
 * ```ts
 * getLast(['a', 'b', 'c'], 1); // => 'b'
 * ```
 * @example
 * ```ts
 * getLast([1, 2, 3], 10); // => Error: Element at offset 10 does not exist.
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function getLast<T>(array: T[], offset: number = 0): T {
  const item = array.at(-1 - offset);

  if (item === undefined) {
    throw new Error(`Element at offset ${offset} does not exist.`);
  }

  return item;
}
