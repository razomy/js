import {countBy} from './count_by';
import {sortBy} from './sort_by';
import {uniq} from './uniq';

export function sortByFrequencyAndUnique(arr: []) {
  const frequencyMap = countBy(arr);

  const uniqueSorted = sortBy(uniq(arr), (item) => {
    return -frequencyMap[item];
  });

  return uniqueSorted;
}


