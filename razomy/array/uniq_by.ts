/**
 * @summary Creates a duplicate-free version of an array, using an iteratee to determine uniqueness.
 * @description Creates a duplicate-free version of an array, keeping only the first occurrence of each element based on the value returned by the iteratee.
 * @param array The array to inspect.
 * @param iteratee The function invoked per element to generate the criterion by which uniqueness is computed.
 * @returns The new duplicate-free array.
 * @example
 * ```ts
 * uniqBy([2.1, 1.2, 2.3], Math.floor); // => [2.1, 1.2]
 * ```
 * @example
 * ```ts
 * uniqBy([{ id: 1 }, { id: 2 }, { id: 1 }], (x) => x.id); // => [{ id: 1 }, { id: 2 }]
 * ```
 * @example
 * ```ts
 * uniqBy(['a', 'A', 'b'], (x) => x.toLowerCase()); // => ['a', 'b']
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function uniqBy<T, U>(
  array: ReadonlyArray<T>,
  iteratee: (value: T) => U
): T[] {
  const seen = new Set<U>();
  const result: T[] = [];

  for (const item of array) {
    const key = iteratee(item);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }

  return result;
}
