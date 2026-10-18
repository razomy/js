import * as abstractions from '@razomy/abstractions';
import treeList from "@razomy/tree-list";

export function mapChildren<I extends abstractions.graph.HasChildren<any[]>, O extends abstractions.graph.HasChildren<any[]>>(
  children_: I[],
  cb: (input: I) => O,
): O[] {
  const children: O[] = [];
  for (const child of children_) {
    children.push(treeList.map(child, cb));
  }
  return children;
}
