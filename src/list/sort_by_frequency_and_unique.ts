import _ from 'lodash';

function sort_by_frequency_and_unique(arr: []) {
  // 1. Count the frequency of each element
  const frequency_map = _.countBy(arr);

  // 2. Get the unique elements and sort them by frequency (descending)
  //    We'll get the unique elements first to avoid sorting duplicates unnecessarily,
  //    then use the frequency map to determine the sort order.
  const unique_sorted = _.sortBy(_.uniq(arr), (item) => {
    return -frequency_map[item]; // Negate to sort in descending order (most frequent first)
  });

  return unique_sorted;
}

export default sort_by_frequency_and_unique;
