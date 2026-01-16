export function try_first_equal<T>(list_1: T[], list_2: T[]) {
  const common_strings = null;

  for (const item_2 of list_2) {
    for (const item_1 of list_1) {
      if (item_2 === item_1) {
        return item_2;
      }
    }
  }

  return common_strings;
}


