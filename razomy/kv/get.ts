import {ArgumentException} from '@razomy/exceptions';
import type {ArrayKeyValuable, ArrayOrKeyValuable, Valuable} from '@razomy/kv';
import {isAkv} from '@razomy/kv';

export function get<T>(valueRecursive: ArrayOrKeyValuable<T, T>, path: T[], pathOffset: number): Valuable<T, T> {
  if (isAkv(valueRecursive)) {
    for (let [key, value] of valueRecursive!) {
      if (key !== path[pathOffset]) {
        continue;
      }
      pathOffset += 1;

      if (pathOffset >= path.length) {
        return value;
      }

      return get(value as ArrayKeyValuable<T, T>, path, pathOffset)
    }
  }

  throw new ArgumentException('invalid arguments', {valueRecursive, path, pathOffset})
}
