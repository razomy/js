export function isObject(val) {
  return (typeof val === 'object');
}

export interface Dict<T> {
  [key: string]: T
}

export function filter<T>(dict: Dict<T>, cb: (t: T, k: string) => boolean) {
  const res: Dict<T> = {};
  for (const dictKey in dict) {
    const item = cb(dict[dictKey], dictKey);
    if (item) {
      res[dictKey] = dict[dictKey];
    }
  }
  return res;
}