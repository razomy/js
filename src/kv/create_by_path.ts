import * as kv from '@razomy/kv';

export function createByPath<T>(path: T[]) {
  const root = kv.k(null as T, kv.akv<T>());

  let last = root;
  for (const item of path) {
    last[0] = item;
    const next = kv.k(null as T, kv.akv<T>());
    last[1].push(next);
    last = next;
  }

  return root;
}
