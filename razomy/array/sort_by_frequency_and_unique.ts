import {countBy} from './count_by';
import {sortBy} from './sort_by';
import {getUniq} from './get_uniq';

/**
 * Creates an array of unique values from the input array, sorted by their frequency of occurrence in descending order.
 * @param {T[]} array The array to process.
 * @returns {T[]} The new array of unique, sorted values.
 * @example
 * // => [2, 1]
 * sortByFrequencyAndUnique([1, 2, 2, 2, 1]);
 * @example
 * // => ['a', 'b', 'c']
 * sortByFrequencyAndUnique(['a', 'a', 'a', 'b', 'b', 'c']);
 * @example
 * // => [10, 20]
 * sortByFrequencyAndUnique([10, 20, 10, 10, 20]);
 */
export function sortByFrequencyAndUnique<T>(array: T[]): T[] {
  const frequencies = countBy(array);
  const distinctItems = getUniq(array);

  return sortBy(distinctItems, (item: T) => {
    return -frequencies[item as any];
  });
}