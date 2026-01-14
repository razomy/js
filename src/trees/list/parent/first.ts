import {WithParent} from 'razomy.trees/list/parent/parent';

export default function first<T extends WithParent>(node: T, cb: (node: T) => boolean) {
  if (cb(node)) {
    return node;
  }

  if (node.parent == null) {
    return null;
  }

  return first(node.parent, cb);
}


