import * as exceptions from '@razomy/exceptions';
import * as kv from '@razomy/kv';

export function get<T>(valueRecursive: kv.ArrayOrKeyValuable<T, T>, path: T[], pathOffset: number): kv.Valuable<T, T> {
  if (kv.isAkv(valueRecursive)) {
    for (let [key, value] of valueRecursive!) {
      if (key !== path[pathOffset]) {
        continue;
      }
      pathOffset += 1;

      if (pathOffset >= path.length) {
        return value;
      }

      return get(value as kv.ArrayKeyValuable<T, T>, path, pathOffset);
    }
  }

  throw new exceptions.ArgumentException('invalid arguments', { valueRecursive, path, pathOffset });
}
