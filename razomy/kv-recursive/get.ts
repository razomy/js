import { assign } from '@razomy/key';
import { getItemByPath } from './get_item_by_path';
import type {ListItem} from './get_key';

export function get(node: ListItem, path: string) {
  return getItemByPath(node, path.split(assign), 0);
}
