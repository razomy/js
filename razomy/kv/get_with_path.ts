import * as kv from '@razomy/kv';
import * as abstractions from '@razomy/abstractions';

export function getWithPath<T>(valueRecursive: abstractions.structure.KeyValueArray<T, T>, path: T[]) {
  const pathed = kv.createByPath(path) as abstractions.structure.KeyValueArray<T, T>;
  const node = kv.get(valueRecursive, path, 0);
  kv.set(pathed, path, node);
  return pathed;
}
