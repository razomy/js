import type {WithChildrenList} from '@razomy/tree-list';

export function iterate<T extends WithChildrenList<any>>(node: T, cb: (node: T) => void) {
  cb(node);
  for (const n of node.children) {
    iterate<T>(n, cb);
  }
}
