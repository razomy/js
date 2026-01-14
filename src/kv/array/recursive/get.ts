import {ListItem} from 'razomy.kv/array/recursive/type';
import assign from 'razomy.key/assign';
import get_item_by_path from './get_item_by_path';

export default function get(node: ListItem, path: string) {
  return get_item_by_path(node, path.split(assign), 0);
}


