export function getFirstKey(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return key;
    }
  }
  return undefined;
}
