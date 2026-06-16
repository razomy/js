import * as treeList from '@razomy/tree-list';

export function iterate<T extends treeList.HasChildrenList<any>>(node: T, cb: (node: T) => void) {
  cb(node);
  for (const n of node.children) {
    iterate<T>(n, cb);
  }
}
