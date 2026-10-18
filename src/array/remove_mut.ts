import * as array from "@razomy/array";

export function removeMut<T>(arr: T[], item: T): T | undefined {
  const arrIndex = arr.findIndex(i => i === item);
  return array.removeAtMut(arr, arrIndex);
}
