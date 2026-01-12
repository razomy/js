export function last_equal<T, T2>(as: T[], bs: T2[], is_condition: (a: T, b: T2) => boolean): [T, T2] | null {
  for (let i = as.length - 1; i >= 0; i--) {
    const item_a = as[i];
    for (let j = bs.length - 1; j >= 0; j--) {
      const item_b = bs[j];
      if (is_condition(item_a, item_b)) {
        return [item_a, item_b];
      }
    }
  }
  return null;
}