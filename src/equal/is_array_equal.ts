export default function is_array_equal<T>(arr1: T[], arr2: T[]) {
  return (
    arr1.length === arr2.length &&
    arr1.every((val, index) => val === arr2[index])
  );
}


