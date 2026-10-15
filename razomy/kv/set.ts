import * as kv from '@razomy/kv';
import * as abstractions from '@razomy/abstractions';

export function set<T>(value: abstractions.structures.KeyValueArray<T, T>, path: T[], newValue: abstractions.structures.KvaOrValue<T, T>): void {
  const parentPath = path.slice(0, -1);
  const parentNode = kv.get(value, parentPath, 0);
  parentNode[1] = newValue;
}
