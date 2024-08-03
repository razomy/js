import {ArgumentException} from "razomy.js/exceptions/argument_exception";
import {ValueRecursiveDict, ValueRecursiveDictOrValue} from "razomy.js/dict/value_recursive/value";
import {create_by_path} from "razomy.js/dict/value_recursive/create_by_path";
import {set} from "razomy.js/dict/value_recursive/set";

export function get<T>(value: ValueRecursiveDictOrValue<T>, path: string[], path_offset: number): ValueRecursiveDictOrValue<T> {
  for (let key in value!) {
    if (key !== path[path_offset]) {
      continue;
    }
    path_offset += 1;

    if (path_offset >= path.length) {
      return value[key];
    }

    return get(value[key], path, path_offset)
  }

  throw new ArgumentException('invalid arguments', {value, path, path_offset})
}


export function get_with_path<T>(value: ValueRecursiveDictOrValue<T>, path: string[]) {
  const pathed = create_by_path(path);
  const node = get(value, path, 0);
  set(pathed, path, node);
  return pathed;
}