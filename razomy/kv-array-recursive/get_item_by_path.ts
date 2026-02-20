import type {ListItem} from './get_key';
import {getItemByPathFromValue} from './get_item_by_path_from_value';
import {getValue} from './get_value';

export function getItemByPath(node: ListItem, path: string[], offset: number): ListItem {
  if (offset >= path.length) {
    return node;
  }

  const value = getValue(node);
  return getItemByPathFromValue(value, path, offset)
}