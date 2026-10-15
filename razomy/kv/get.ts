import * as exceptions from '@razomy/exceptions';
import * as kv from '@razomy/kv';
import * as abstractions from '@razomy/abstractions';

export function get<T>(valueRecursive: abstractions.structures.KeyValueArray<T, T>, path: T[], pathOffset: number): abstractions.structures.KvaOrValue<T, T> {
  if (kv.isAkv(valueRecursive)) {
    for (const [key, value] of valueRecursive!) {
      if (key !== path[pathOffset]) {
        continue;
      }
      pathOffset += 1;

      if (pathOffset >= path.length) {
        return value;
      }

      return get(value as abstractions.structures.KeyValueArray<T, T>, path, pathOffset);
    }
  }

  throw new exceptions.ArgumentException('invalid arguments', { valueRecursive, path, pathOffset });
}
