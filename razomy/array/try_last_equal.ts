/**
 * Returns the last pair of elements from two arrays that satisfy the provided predicate.
 * Iterates through both arrays in reverse order.
 * @param arrayA The first array.
 * @param arrayB The second array.
 * @param predicate The comparison function to determine equality or condition match.
 * @returns A tuple containing the matched elements from both arrays, or null if no match is found.
 * @example
 * // => [3, 3]
 * tryLastEqual([1, 2, 3], [3, 4, 5], (a, b) => a === b);
 * @example
 * // => ['b', 'B']
 * tryLastEqual(['a', 'b'], ['A', 'B'], (a, b) => a.toUpperCase() === b);
 * @example
 * // => null
 * tryLastEqual([1, 2], [3, 4], (a, b) => a === b);
 */
export function tryLastEqual<T, U>(
  arrayA: T[],
  arrayB: U[],
  predicate: (itemA: T, itemB: U) => boolean
): [T, U] | null {
  for (let i = arrayA.length - 1; i >= 0; i--) {
    const itemA = arrayA[i];
    for (let j = arrayB.length - 1; j >= 0; j--) {
      const itemB = arrayB[j];
      if (predicate(itemA, itemB)) {
        return [itemA, itemB];
      }
    }
  }

  return null;
}