export function setLastMut<T>(value: T, arr: T[], deltaIndex = 0) {
  return arr[arr.length - 1 + deltaIndex] = value
}