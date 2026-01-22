export function getLast<T>(arr: T[], deltaIndex = 0) {
  return arr.at(-1 + deltaIndex)!
}