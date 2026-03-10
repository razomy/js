/**
 * @summary Sort an array in place based on the order defined by another array.
 * @description Mutably sorts `oldOrder` so that its elements appear in the same
 * relative order as they do in `newOrder`. Elements not found in `newOrder` are
 * pushed to the end in their original relative order (via `Infinity` fallback).
 * @param oldOrder The array to sort in place.
 * @param newOrder The array defining the desired order.
 * @returns The mutated `oldOrder` array, sorted according to `newOrder`.
 * @example
 * ```ts
 * sortByArrayMut(['c', 'b', 'a'], ['a', 'b', 'c']); // => ['a', 'b', 'c']
 * ```
 * @example
 * ```ts
 * sortByArrayMut(['x', 'y', 'z'], ['z', 'x', 'y']); // => ['z', 'x', 'y']
 * ```
 * @example
 * ```ts
 * sortByArrayMut(['d', 'a', 'b'], ['b', 'a']); // => ['b', 'a', 'd']
 * ```
 * @complexity time O(m + n log n) where m = newOrder.length, n = oldOrder.length
 * @complexity memory O(m)
 */
export function sortByArrayMut<T extends string>(oldOrder: T[], newOrder: T[]): T[] {
  const orderMap = new Map<T, number>();

  for (let i = 0; i < newOrder.length; i++) {
    orderMap.set(newOrder[i], i);
  }

  oldOrder.sort((a, b) => (orderMap.get(a) ?? Infinity) - (orderMap.get(b) ?? Infinity));

  return oldOrder;
}
