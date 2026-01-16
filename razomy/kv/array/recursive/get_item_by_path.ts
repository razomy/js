import {ListItem} from './get_key';
import {get_item_by_path_from_value} from './get_item_by_path_from_value';
import {get_value} from './get_value';

export function get_item_by_path(node: ListItem, path: string[], offset: number): ListItem {
  if (offset >= path.length) {
    return node;
  }

  const value = get_value(node);
  return get_item_by_path_from_value(value, path, offset)
}