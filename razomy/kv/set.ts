import * as kv from '@razomy/kv';
import * as abstracts from '@razomy/abstracts';

export function set<T>(value: abstracts.structures.KeyValueArray<T, T>, path: T[], newValue: abstracts.structures.KvaOrValue<T, T>): void {
  const parentPath = path.slice(0, -1);
  const parentNode = kv.get(value, parentPath, 0);
  parentNode[1] = newValue;
}
