import {count_by} from './count_by';
import {sort_by} from './sort_by';

export function uniq(array) {
  const result: any[] = [];
  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    if (!result.includes(value)) {
      result.push(value);
    }
  }
  return result;
}

export function sort_by_frequency_and_unique(arr: []) {
  const frequency_map = count_by(arr);

  const unique_sorted = sort_by(uniq(arr), (item) => {
    return -frequency_map[item];
  });

  return unique_sorted;
}

export default sort_by_frequency_and_unique;
