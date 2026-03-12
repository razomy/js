import * as treeList from '@razomy/tree-list';

export function iterateReverse<T extends treeList.WithChildrenList<any>>(node: T, cb: (node: T) => void) {
  for (const n of node.children) {
    iterateReverse(n, cb);
  }

  cb(node);
}
