export function first_equal_array<T>(list1: T[], list2: T[]) {
  const common_strings = null;

  for (const item2 of list2) {
    for (const item1 of list1) {
      if (item2 === item1) {
        return item2;
      }
    }
  }

  return common_strings;
}