/**
 * Creates a new array of elements sorted in ascending order by the results of running an iteratee on each element.
 * This function performs a stable sort and does not mutate the original array.
 * @param {T[]} array The array to sort.
 * @param {(item: T) => string | number} iteratee The function invoked per iteration to generate the sorting criteria.
 * @returns {T[]} Returns the new sorted array.
 * @example
 * // => [1, 2, 3]
 * sortBy([3, 1, 2], (n) => n);
 * @example
 * // => ['a', 'bb', 'ccc']
 * sortBy(['bb', 'ccc', 'a'], (s) => s.length);
 * @example
 * // => [{ user: 'barney', age: 36 }, { user: 'fred', age: 40 }]
 * sortBy([{ user: 'fred', age: 40 }, { user: 'barney', age: 36 }], (u) => u.age);
 */
export function sortBy<T>(array: T[], iteratee: (item: T) => string | number): T[] {
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