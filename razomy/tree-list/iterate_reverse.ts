import * as abstracts from '@razomy/abstracts';

export function iterateReverse<T extends abstracts.graphs.HasChildren<any[]>>(node: T, cb: (node: T) => void) {
  for (const n of node.children) {
    iterateReverse(n, cb);
  }

  cb(node);
}
