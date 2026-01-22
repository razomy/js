/**
 * Groups the elements of an array according to the result of the iteratee function.
 * @param {T[]} array The array to iterate over.
 * @param {(item: T) => K} iteratee The function invoked per iteration to generate the key.
 * @returns {Record<K, T[]>} The object with grouped arrays.
 * @example
 * // => { '4': [4.2], '6': [6.1, 6.3] }
 * groupBy([6.1, 4.2, 6.3], Math.floor);
 * @example
 * // => { '3': ['one', 'two'], '5': ['three'] }
 * groupBy(['one', 'two', 'three'], (s) => s.length);
 * @example
 * // => { 'a': [{ k: 'a', v: 1 }], 'b': [{ k: 'b', v: 2 }] }
 * groupBy([{ k: 'a', v: 1 }, { k: 'b', v: 2 }], (o) => o.k);
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