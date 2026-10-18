import * as treeDict from '@razomy/tree-dict';
import * as abstractions from "@razomy/abstractions";

export function get<T extends abstractions.graph.HasChildrenDict<T>>(node: T, path: string[], offset: number): T {
  if (offset >= path.length) {
    return node;
  }

  return treeDict.getValue(node, path, offset);
}
