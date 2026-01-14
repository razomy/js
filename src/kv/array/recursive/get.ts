import {get_value, ListItem} from "razomy.kv/array/recursive/type";
import {assign} from "razomy.key/assign";
import {get_item_by_path_from_value} from './get_item_by_path_from_value';

export function get_item_by_path(node: ListItem, path: string[], offset: number): ListItem {
  if (offset >= path.length) {
    return node;
  }

  const value = get_value(node);
  return get_item_by_path_from_value(value, path, offset)
}

export function get(node: ListItem, path: string) {
  return get_item_by_path(node, path.split(assign), 0);
}

export default get;
