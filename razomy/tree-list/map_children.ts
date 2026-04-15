import * as treeList from "@razomy/tree-list";

export function mapChildren<I extends treeList.WithChildrenList<any>, O extends treeList.WithChildrenList<any>>(
  children_: I[],
  cb: (input: I) => O,
): O[] {
  const children: O[] = [];
  for (const child of children_) {
    children.push(treeList.map(child, cb));
  }
  return children;
}
