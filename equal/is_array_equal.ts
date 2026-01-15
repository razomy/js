export function is_array_equal<T>(arr_1: T[], arr_2: T[]) {
  return (
    arr_1.length === arr_2.length &&
    arr_1.every((val, index) => val === arr_2[index])
  );
}


