import * as abstracts from '@razomy/abstracts';
import treeList from "@razomy/tree-list";

export function mapChildren<I extends abstracts.graphs.HasChildren<any[]>, O extends abstracts.graphs.HasChildren<any[]>>(
  children_: I[],
  cb: (input: I) => O,
): O[] {
  const children: O[] = [];
  for (const child of children_) {
    children.push(treeList.map(child, cb));
  }
  return children;
}
