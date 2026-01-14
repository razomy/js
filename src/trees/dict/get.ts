import {WithChildrenDict} from 'razomy.trees/dict/with_children_dict';
import get_value from './get_value';

export default function get<T extends WithChildrenDict<T>>(node: T, path: string[], offset: number): T {
  if (offset >= path.length) {
    return node;
  }

  return get_value(node, path, offset)
}



export * from './get_value';
export * from './get_by_string';
export * from './get_path';
