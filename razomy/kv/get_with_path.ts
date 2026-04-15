import * as kv from '@razomy/kv';

export function getWithPath<T>(valueRecursive: kv.ArrayKeyValuable<T, T>, path: T[]) {
  const pathed = kv.createByPath(path) as kv.ArrayKeyValuable<T, T>;
  const node = kv.get(valueRecursive, path, 0);
  kv.set(pathed, path, node);
  return pathed;
}
