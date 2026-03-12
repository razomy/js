import { getValue } from './get_value';
import * as treeDict from '@razomy/tree-dict';

export function get<T extends treeDict.WithChildrenDict<T>>(node: T, path: string[], offset: number): T {
  if (offset >= path.length) {
    return node;
  }

  return getValue(node, path, offset);
}
