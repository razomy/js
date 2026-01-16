import {WithParent} from 'razomy.tree/list/parent/parent';

export function first<T extends WithParent>(node: T, cb: (node: T) => boolean) {
  if (cb(node)) {
    return node;
  }

  if (node.parent == null) {
    return null;
  }

  return first(node.parent, cb);
}


