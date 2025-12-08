import {ValueRecursiveDict} from "razomy.js/vrd/value";

export function create_by_path<T>(path: string[]) {
  const res = new ValueRecursiveDict<T>();

  let last = res;
  for (let string of path) {
    last[string] = new ValueRecursiveDict();
    last = last[string];
  }

  return res;
}