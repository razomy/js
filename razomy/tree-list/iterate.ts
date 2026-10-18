import * as abstractions from '@razomy/abstractions';

export function iterate<T extends abstractions.graph.HasChildren<any[]>>(node: T, cb: (node: T) => void) {
  cb(node);
  for (const n of node.children) {
    iterate<T>(n, cb);
  }
}
