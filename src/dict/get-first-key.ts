export function getFirstKey(obj: any): string | undefined {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return key;
    }
  }
  return undefined;
}

export function isObject(val) {
  return (typeof val === 'object');
}