export function removeLast<T>(arr: T[], deltaIndex = 0) {
  return arr.slice(0, arr.length - 1 + deltaIndex)
}