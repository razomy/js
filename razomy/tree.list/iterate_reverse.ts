import {WithChildrenList} from '@razomy/tree.list';

export function iterateReverse<T extends WithChildrenList<any>>(node: T, cb: (node: T) => void) {
  for (const n of node.children) {
    iterateReverse(n, cb);
  }

  cb(node);
}
