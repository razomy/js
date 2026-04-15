import * as treeList from '@razomy/tree-list';

export function first<T extends treeList.parent.WithParent>(node: T, cb: (node: T) => boolean) {
  if (cb(node)) {
    return node;
  }

  if (node.parent == null) {
    return null;
  }

  return first(node.parent, cb);
}
