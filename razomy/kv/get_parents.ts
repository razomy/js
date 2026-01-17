import {ArgumentException} from 'razomy.exceptions/argument_exception';
import {Valuable} from 'razomy.kv/kv';
import {isAkv} from 'razomy.kv/is_akv';
import {Slug} from 'razomy.path/string/path_string';

export function getParents<T>(valueRecursive: Valuable<T, T>, path: Slug[], pathOffset: number): Valuable<T, T>[] {
  if (isAkv(valueRecursive)) {
    for (let [key, value] of valueRecursive!) {
      if (key !== path[pathOffset]) {
        continue;
      }
      pathOffset += 1;

      if (pathOffset >= path.length) {
        return [valueRecursive];
      }

      return [valueRecursive, ...getParents(value, path, pathOffset)]
    }
  }

  throw new ArgumentException('invalid arguments', {valueRecursive, path, pathOffset})
}
