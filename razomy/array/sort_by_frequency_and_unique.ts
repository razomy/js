import { countBy } from './count_by';
import { sortBy } from './sort_by';
import { uniq } from './uniq';

/**
 * @summary Creates an array of unique values from the input array, sorted by their frequency of occurrence in descending order.
 * @param array The array to process.
 * @returns The new array of unique, sorted values.
 * @example
 * ```ts
 * sortByFrequencyAndUnique([1, 2, 2, 2, 1]); // => [2, 1]
 * ```
 * @example
 * ```ts
 * sortByFrequencyAndUnique(['a', 'a', 'a', 'b', 'b', 'c']); // => ['a', 'b', 'c']
 * ```
 * @example
 * ```ts
 * sortByFrequencyAndUnique([10, 20, 10, 10, 20]); // => [10, 20]
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function sortByFrequencyAndUnique<T>(array: T[]): T[] {
  const frequencies = countBy(array);
  const distinctItems = uniq(array);

  return sortBy(distinctItems, (item: T) => {
    return -frequencies[item as any];
  });
}
