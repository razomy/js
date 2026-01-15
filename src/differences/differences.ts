import {progress} from 'razomy.shell/progress';
import {Difference} from 'razomy.difference/type';
import {DifferenceType} from 'razomy.difference/type';
import {first_equal_indexes} from 'razomy.indexes/first_equal_indexes';

/** a was, b become */
export function differences<T>(a: T[], b: T[], sum: (...as: T[]) => T) {
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
      let [n_a_i, n_b_i] = first_equal_indexes(a, b, a_i, b_i);

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


