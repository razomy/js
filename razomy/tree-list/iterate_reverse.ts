import * as treeList from '@razomy/tree-list';

export function iterateReverse<T extends treeList.HasChildrenList<any>>(node: T, cb: (node: T) => void) {
  for (const n of node.children) {
    iterateReverse(n, cb);
  }

  cb(node);
}
