/**
 * Groups the elements of an array according to the result of the iteratee function.
 * @param array The array to iterate over.
 * @param iteratee The function invoked per iteration to generate the key.
 * @returns The object with grouped arrays.
 * @example
 * ```ts
 * groupBy([6.1, 4.2, 6.3], Math.floor);
 * // => { '4': [4.2], '6': [6.1, 6.3] }
 * ```
 * @example
 * ```ts
 * groupBy(['one', 'two', 'three'], (s) => s.length);
 * // => { '3': ['one', 'two'], '5': ['three'] }
 * ```
 * @example
 * ```ts
 * groupBy([{ k: 'a', v: 1 }, { k: 'b', v: 2 }], (o) => o.k);
 * // => { 'a': [{ k: 'a', v: 1 }], 'b': [{ k: 'b', v: 2 }] }
 * ```
 */
export function groupBy<T, K extends PropertyKey>(array: T[], iteratee: (item: T) => K): Record<K, T[]> {
  return array.reduce((result, item) => {
    const key = iteratee(item);

    if (!result[key]) {
      result[key] = [];
    }

    result[key].push(item);

    return result;
  }, {} as Record<K, T[]>);
}
