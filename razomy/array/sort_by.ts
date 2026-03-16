/**
 * @summary This function performs a stable sort and does not mutate the original array.
 * @description Creates a new array of elements sorted in ascending order by the results of running an iteratee on each element.
 * @param array The array to sort.
 * @param {(item: T) => string | number} iteratee The function invoked per iteration to generate the sorting criteria.
 * @returns Returns the new sorted array.
 * @example
 * ```ts
 * sortBy([3, 1, 2], (n) => n); // => [1, 2, 3]
 * ```
 * @example
 * ```ts
 * sortBy(['bb', 'ccc', 'a'], (s) => s.length); // => ['a', 'bb', 'ccc']
 * ```
 * @example
 * ```ts
 * sortBy([{ user: 'fred', age: 40 }, { user: 'barney', age: 36 }], (u) => u.age);
 * // => [{ user: 'barney', age: 36 }, { user: 'fred', age: 40 }]
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function sortBy<T>(array: T[], iteratee: (item: T) => string | number = i => i as any): T[] {
  const length = array.length;
  const mapped = new Array(length);

  for (let i = 0; i < length; i++) {
    const value = array[i];
    mapped[i] = {
      index: i,
      value,
      criteria: iteratee(value),
    };
  }

  mapped.sort((a, b) => {
    const criteriaA = a.criteria;
    const criteriaB = b.criteria;

    if (criteriaA > criteriaB) {
      return 1;
    }

    if (criteriaA < criteriaB) {
      return -1;
    }

    return a.index - b.index;
  });

  const result = new Array(length);
  for (let i = 0; i < length; i++) {
    result[i] = mapped[i].value;
  }

  return result;
}
