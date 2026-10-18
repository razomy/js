import * as treeDict from '@razomy/tree-dict';
import * as abstractions from "@razomy/abstractions";

export function getByString<T extends abstractions.graph.HasChildrenDict<T>>(node: T, path: string, separator: string) {
  return treeDict.get(node, path.split(separator), 0);
}
