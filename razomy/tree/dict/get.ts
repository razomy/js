import {WithChildrenDict} from 'razomy.tree/dict/with_children_dict';
import {get_value} from './get_value';

export function get<T extends WithChildrenDict<T>>(node: T, path: string[], offset: number): T {
  if (offset >= path.length) {
    return node;
  }

  return get_value(node, path, offset)
}
