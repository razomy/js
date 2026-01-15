export function sort_by<T>(collection: T[], iteratee: (t: T) => string | number): T[] {
  let index = 0;
  const length = collection.length;
  const result = new Array(length);
  for (let i = 0; i < length; i++) {
    const value = collection[i];
    result[i] = {
      value: value,
      index: index++,
      criteria: iteratee(value)
    };
  }

  result.sort((a, b) => {
    const val_a = a.criteria;
    const val_b = b.criteria;

    if (val_a !== val_b) {
      if (val_a > val_b || val_a === undefined) return 1;
      if (val_a < val_b || val_b === undefined) return -1;
    }

    return a.index - b.index;
  });
  for (let i = 0; i < length; i++) {
    result[i] = result[i].value;
  }

  return result;
}
