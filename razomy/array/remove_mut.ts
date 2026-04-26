import {removeAtMut} from "./remove_at_mut";

export function removeMut<T>(arr: T[], item: T): T | undefined {
  const arrIndex = arr.findIndex(i => i === item);
  return removeAtMut(arr, arrIndex);
}
