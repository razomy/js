import * as kv from '@razomy/kv';

export function set<T>(value: kv.ArrayOrKeyValue<T, T>, path: T[], newValue: kv.Valuable<T, T>): void {
  const parentPath = path.slice(0, -1);
  const parentNode = kv.get(value, parentPath, 0);
  parentNode[1] = newValue;
}
