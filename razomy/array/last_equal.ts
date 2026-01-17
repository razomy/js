export function lastEqual<T, T2>(as: T[], bs: T2[], isCondition: (a: T, b: T2) => boolean): [T, T2] | null {
  for (let i = as.length - 1; i >= 0; i--) {
    const itemA = as[i];
    for (let j = bs.length - 1; j >= 0; j--) {
      const itemB = bs[j];
      if (isCondition(itemA, itemB)) {
        return [itemA, itemB];
      }
    }
  }
  return null;
}


