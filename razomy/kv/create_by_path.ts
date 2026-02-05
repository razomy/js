import {akv} from '@razomy/kv';
import {k} from './k';

export function createByPath<T>(path: T[]) {
  const root = k(null as T, akv<T>());

  let last = root;
  for (let item of path) {
    last[0] = item;
    let next = k(null as T, akv<T>());
    last[1].push(next);
    last = next;
  }

  return root;
}


