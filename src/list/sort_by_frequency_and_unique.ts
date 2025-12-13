import _ from 'lodash';

export function sort_by_frequency_and_unique(arr: []) {
  // 1. Count the frequency of each element
  const frequencyMap = _.countBy(arr);

  // 2. Get the unique elements and sort them by frequency (descending)
  //    We'll get the unique elements first to avoid sorting duplicates unnecessarily,
  //    then use the frequency map to determine the sort order.
  const uniqueSorted = _.sortBy(_.uniq(arr), (item) => {
    return -frequencyMap[item]; // Negate to sort in descending order (most frequent first)
  });

  return uniqueSorted;
}