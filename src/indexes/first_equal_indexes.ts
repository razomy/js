/** first index */
export function first_equal_indexes<T>(
  a: T[],
  b: T[],
  start_a = 0,
  start_b = 0
) {
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

export default first_equal_indexes;
