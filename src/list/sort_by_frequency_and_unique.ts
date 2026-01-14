import count_by from './count_by';
import sort_by from './sort_by';
import uniq from './uniq';

export default function sort_by_frequency_and_unique(arr: []) {
  const frequency_map = count_by(arr);

  const unique_sorted = sort_by(uniq(arr), (item) => {
    return -frequency_map[item];
  });

  return unique_sorted;
}


