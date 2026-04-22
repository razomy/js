import * as kv from '@razomy/kv';
import * as abstracts from '@razomy/abstracts';

export function getWithPath<T>(valueRecursive: abstracts.structures.KeyValueArray<T, T>, path: T[]) {
  const pathed = kv.createByPath(path) as abstracts.structures.KeyValueArray<T, T>;
  const node = kv.get(valueRecursive, path, 0);
  kv.set(pathed, path, node);
  return pathed;
}
