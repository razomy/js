import {k} from "razomy/kv/kv";
import {ak} from "razomy/kv/akv";

export function create_by_path<T>(path: T[]) {
  const root = k(null as T, ak<T>());

  let last = root;
  for (let item of path) {
    last[0] = item;
    let next = k(null as T, ak<T>());
    last[1].push(next);
    last = next;
  }

  return root;
}
