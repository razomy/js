import { k } from './k';
import * as kv from "@razomy/kv";

export function createByPath<T>(path: T[]) {
  const root = k(null as T, kv.akv<T>());

  let last = root;
  for (let item of path) {
    last[0] = item;
    let next = k(null as T, kv.akv<T>());
    last[1].push(next);
    last = next;
  }

  return root;
}
