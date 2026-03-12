import { get } from './get';
import * as treeDict from "@razomy/tree-dict";

export function getByString<T extends treeDict.WithChildrenDict<T>>(node: T, path: string, separator: string) {
  return get(node, path.split(separator), 0);
}
