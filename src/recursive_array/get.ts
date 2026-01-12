import {ArgumentException} from "razomy/exceptions/argument_exception";
import {get_key, get_value, ListItem, RecursiveList} from "razomy/recursive_array/recursive";
import {assign} from "razomy/key/assign";

export function get_item_by_path(node: ListItem, path: string[], offset: number): ListItem {
  if (offset >= path.length) {
    return node;
  }

  const value = get_value(node);
  return get_item_by_path_from_value(value, path, offset)
}

export function get_item_by_path_from_value(value: RecursiveList, path: string[], offset: number) {
  for (let node of value) {
    const key = get_key(node);
    if (key !== path[offset]) {
      continue;
    }

    return get_item_by_path(node, path, offset + 1)
  }

  throw new ArgumentException('invalid arguments', {value, path, offset})
}


export function get(node: ListItem, path: string) {
  return get_item_by_path(node, path.split(assign), 0);
}