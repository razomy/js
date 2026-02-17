import {WithChildrenDict} from '@razomy/tree-dict';
import {getValue} from './get_value';

export function get<T extends WithChildrenDict<T>>(node: T, path: string[], offset: number): T {
  if (offset >= path.length) {
    return node;
  }

  return getValue(node, path, offset)
}
