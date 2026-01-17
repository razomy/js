import {ListItem} from 'razomy.kv/array/recursive';
import {assign} from 'razomy.key/assign';
import {getItemByPath} from './get_item_by_path';

export function get(node: ListItem, path: string) {
  return getItemByPath(node, path.split(assign), 0);
}


