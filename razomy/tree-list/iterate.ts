import * as abstracts from '@razomy/abstracts';

export function iterate<T extends abstracts.graphs.HasChildren<any[]>>(node: T, cb: (node: T) => void) {
  cb(node);
  for (const n of node.children) {
    iterate<T>(n, cb);
  }
}
