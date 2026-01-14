import {ArgumentException} from 'razomy.exceptions/argument_exception';
import {ArrayKeyValuable, ArrayOrKeyValuable, Valuable} from 'razomy.kv/kv';
import is_akv from 'razomy.kv/is_akv';
export default function get<T>(value_recursive: ArrayOrKeyValuable<T, T>, path: T[], path_offset: number): Valuable<T, T> {
  if (is_akv(value_recursive)) {
    for (let [key, value] of value_recursive!) {
      if (key !== path[path_offset]) {
        continue;
      }
      path_offset += 1;

      if (path_offset >= path.length) {
        return value;
      }

      return get(value as ArrayKeyValuable<T, T>, path, path_offset)
    }
  }

  throw new ArgumentException('invalid arguments', {value_recursive, path, path_offset})
}
