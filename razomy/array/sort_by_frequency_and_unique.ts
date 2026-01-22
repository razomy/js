import {countBy} from './count_by';
import {sortBy} from './sort_by';
import {getUniq} from './getUniq';

export function sortByFrequencyAndUnique(arr: []) {
  const frequencyMap = countBy(arr);

  const uniqueSorted = sortBy(getUniq(arr), (item) => {
    return -frequencyMap[item];
  });

  return uniqueSorted;
}


