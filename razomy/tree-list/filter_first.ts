import * as treeList from "@razomy/tree-list";

export function filterFirst<T extends treeList.WithChildrenList<any>>(node: T, cb: (node: T) => boolean): T[] {
  let res: T[] = [];

  if (cb(node)) {
    res.push(node);
    return res;
  }
  for (const n of node.children) {
    res = res.concat(filterFirst(n, cb));
  }

  return res;
}
