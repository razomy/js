import {progress} from "razomy.js/shells/log";
import {merge} from "razomy.js/string/string";

export type DifferenceType = 'unchanged' | 'added' | 'removed'


export interface Difference<T> {
  type: DifferenceType,
  value: T,
}

/** first index with lowest */
function find_first_duplicate_index<T>(a: T[], b: T[], start_a = 0, start_b = 0) {
  let a_index = a.length;
  let b_index = b.length;
  let potential_index = a_index + b_index;
  let a_max = Math.min(a.length, potential_index);
  let b_max = Math.min(b.length, potential_index);

  for (let a_i = start_a; a_i < a_max; a_i++) {
    for (let b_i = start_b; b_i < b_max; b_i++) {
      let potential = a_i + b_i;
      if (potential > potential_index) {
        break;
      }
      if (a[a_i] !== b[b_i]) {
        continue;
      }
      if (potential < potential_index) {
        a_index = a_i;
        b_index = b_i;
        potential_index = potential;
        a_max = Math.min(a.length, potential_index);
        b_max = Math.min(b.length, potential_index);
      }
    }
  }
  return [a_index, b_index];
}

export function divide_by(str: string, offset: number, divider: string, list: string[]) {
  let ix = str.indexOf(divider, offset);
  while (ix !== -1) {
    list.push(str.substring(offset, ix + 1))
    offset = ix + 1;
    ix = str.indexOf(divider, offset);
  }

  if (offset < str.length) {
    list.push(str.substring(offset))
  }

  return list;
}

export function difference_string(a_text: string, b_text: string) {
  const a_lines = divide_by(a_text, 0, '\n', []);
  const b_lines = divide_by(b_text, 0, '\n', []);
  return difference(a_lines, b_lines, (...as) => merge(as));
}

/** a was, b become */
export function difference<T>(a: T[], b: T[], sum: (...as: T[]) => T) {
  const diffs = [] as Difference<T>[];
  let last: Difference<T> | null = null;

  function add_diff(type: DifferenceType, value: T) {
    if (last?.type === type) {
      last.value = sum(last.value, value);
    } else {
      last = {type, value};
      diffs.push(last);
    }
  }

  let a_i = 0;
  let b_i = 0;

  while (a_i < a.length && b_i < b.length) {
    progress(b_i, b.length);
    if (a[a_i] === b[b_i]) {
      add_diff('unchanged', a[a_i]);
      a_i++;
      b_i++;
    } else {
      let [n_a_i, n_b_i] = find_first_duplicate_index(a, b, a_i, b_i);

      if (a_i < n_a_i) {
        add_diff('removed', sum(...a.slice(a_i, n_a_i)));
        a_i = n_a_i;
      }

      if (b_i < n_b_i) {
        add_diff('added', sum(...b.slice(b_i, n_b_i)));
        b_i = n_b_i;
      }
    }
  }

  if (a_i < a.length) {
    add_diff('removed', sum(...a.slice(a_i)));
  } else if (b_i < b.length) {
    add_diff('added', sum(...b.slice(b_i)));
  }

  return diffs;
}
