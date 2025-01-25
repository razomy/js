import {ArgumentException} from "razomy.js/exceptions/argument_exception";
import {is_value_recursion, ValueRecursiveDict, ValueRecursiveDictOrValue} from "razomy.js/dict/value_recursive/value";
import {create_by_path} from "razomy.js/dict/value_recursive/create_by_path";
import {set} from "razomy.js/dict/value_recursive/set";
import {iterate_break} from "razomy.js/dict/value_recursive/iterate";
import {DictKey} from "razomy.js/dict/dict";

export function get<T>(value_recursive: ValueRecursiveDictOrValue<T>, path: DictKey[], path_offset: number): ValueRecursiveDictOrValue<T> {
  for (let key in value_recursive!) {
    if (key !== path[path_offset]) {
      continue;
    }
    path_offset += 1;

    if (path_offset >= path.length) {
      return value_recursive[key];
    }

    return get(value_recursive[key], path, path_offset)
  }

  throw new ArgumentException('invalid arguments', {value_recursive, path, path_offset})
}


export function get_with_path<T>(value_recursive: ValueRecursiveDictOrValue<T>, path: string[]) {
  const pathed = create_by_path(path);
  const node = get(value_recursive, path, 0);
  set(pathed, path, node);
  return pathed;
}

export function get_matches_key<T>(value_recursive: ValueRecursiveDictOrValue<T>, keys: string[]) {
  const matches = [] as DictKey[][];
  iterate_break({input: value_recursive, parents: []}, (ctx) => {
    if (is_value_recursion(ctx.input)) {
      for (let key of keys) {
        if (key in ctx.input) {
          matches.push(ctx.parents);
          return false;
        }
      }
    }
    return true;
  });
  return matches;
}

export function get_parents<T>(value_recursive: ValueRecursiveDictOrValue<T>, path: DictKey[], path_offset: number): ValueRecursiveDictOrValue<T>[] {
  for (let key in value_recursive!) {
    if (key !== path[path_offset]) {
      continue;
    }
    path_offset += 1;

    if (path_offset >= path.length) {
      return [value_recursive];
    }

    return [value_recursive, ...get_parents(value_recursive[key], path, path_offset)]
  }

  throw new ArgumentException('invalid arguments', {value_recursive, path, path_offset})
}