import * as treeList from '@razomy/tree-list';

export function filter<T extends treeList.WithChildrenList<any>>(node: T, cb: (node: T) => boolean): T[] {
  let res: T[] = [];

  if (cb(node)) {
    res.push(node);
  }

  for (const n of node.children) {
    res = res.concat(filter(n, cb));
  }

  return res;
}
