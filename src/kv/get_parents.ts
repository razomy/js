import { ArgumentException } from "razomy.exceptions/argument_exception";
import { Valuable } from "razomy.kv/kv";
import { is_akv } from "razomy.kv/akv";
import { Slug } from "razomy.path/string/path_string";

export function get_parents<T>(value_recursive: Valuable<T, T>, path: Slug[], path_offset: number): Valuable<T, T>[] {
    if (is_akv(value_recursive)) {
    for (let [key, value] of value_recursive!) {
      if (key !== path[path_offset]) {
        continue;
      }
      path_offset += 1;

      if (path_offset >= path.length) {
        return [value_recursive];
      }

      return [value_recursive, ...get_parents(value, path, path_offset)]
    }
    }

    throw new ArgumentException('invalid arguments', {value_recursive, path, path_offset})
}
