import {Dict} from 'razomy.dict/dict';

export function filterDict<T>(dict: Dict<T>, cb: (t: T, k: string) => boolean) {
  const res: Dict<T> = {};
  for (const dictKey in dict) {
    const item = cb(dict[dictKey], dictKey);
    if (item) {
      res[dictKey] = dict[dictKey];
    }
  }
  return res;
}


