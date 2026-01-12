import {Dict} from "razomy/dict/dict";

export function filter_dict<T>(dict: Dict<T>, cb: (t: T, k: string) => boolean) {
  const res: Dict<T> = {};
  for (const dict_key in dict) {
    const item = cb(dict[dict_key], dict_key);
    if (item) {
      res[dict_key] = dict[dict_key];
    }
  }
  return res;
}
