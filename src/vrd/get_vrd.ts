import {ArgumentException} from "razomy/exceptions/argument_exception";
import {is_vrd, Vrd, VrdOrValue} from "razomy/vrd/vrd";
import path_to_vrd from "razomy/vrd/path_to_vrd";
import set_vrd from "razomy/vrd/set_vrd";
import {iterate_break, iterate_skip} from 'razomy/vrd/iterate_vrd';
import {DictKey} from "razomy/dict/dict";

function get_vrd<T>(value_recursive: VrdOrValue<T>, path: DictKey[], path_offset: number): VrdOrValue<T> {
  for (let key in value_recursive!) {
    if (key !== path[path_offset]) {
      continue;
    }
    path_offset += 1;

    if (path_offset >= path.length) {
      return value_recursive[key];
    }

    return get_vrd(value_recursive[key], path, path_offset)
  }

  throw new ArgumentException('invalid arguments', {value_recursive, path, path_offset})
}


export function get_with_path<T>(value_recursive: VrdOrValue<T>, path: string[]) {
  const pathed = path_to_vrd(path);
  const node = get_vrd(value_recursive, path, 0);
  set_vrd(pathed, path, node);
  return pathed;
}

export function get_matches_key<T>(value_recursive: VrdOrValue<T>, keys: string[]) {
  const matches = [] as DictKey[][];
  iterate_skip({input: value_recursive, parents: []}, (ctx) => {
      for (let key of keys) {
        if (key === ctx.parents.at(-1)) {
          matches.push(ctx.parents);
          return false;
        }
    }
    return true;
  });
  return matches;
}

export function get_parents<T>(value_recursive: VrdOrValue<T>, path: DictKey[], path_offset: number): VrdOrValue<T>[] {
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

export default get_vrd;
