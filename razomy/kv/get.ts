import {ArgumentException} from 'razomy.exceptions/argument_exception';
import {ArrayKeyValuable, ArrayOrKeyValuable, Valuable} from 'razomy.kv/kv';
import {isAkv} from 'razomy.kv/is_akv';

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
