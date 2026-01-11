import {ArgumentException} from "razomy.js/exceptions/argument_exception";
import {create_by_path} from "razomy.js/kv/create_by_path";
import {set} from "razomy.js/kv/set";
import {ArrayKeyValuable, ArrayOrKeyValuable, Valuable} from "razomy.js/kv/kv";
import {is_akv} from "razomy.js/kv/akv";
import {Slug} from "razomy.js/fs/pathString";

export function get<T>(value_recursive: ArrayOrKeyValuable<T, T>, path: T[], path_offset: number): Valuable<T, T> {
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


export function get_with_path<T>(value_recursive: ArrayKeyValuable<T, T>, path: T[]) {
  const pathed = create_by_path(path) as ArrayKeyValuable<T, T>;
  const node = get(value_recursive, path, 0);
  set(pathed, path, node);
  return pathed;
}


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
