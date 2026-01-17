export function tryFirstEqual<T>(list1: T[], list2: T[]) {
  const commonStrings = null;

  for (const item2 of list2) {
    for (const item1 of list1) {
      if (item2 === item1) {
        return item2;
      }
    }
  }

  return commonStrings;
}


