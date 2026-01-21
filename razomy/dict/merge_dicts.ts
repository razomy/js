export function mergeDicts(array: object[]) {
  return array.reduce((acc, current) => ({...acc, ...current}), {});
}