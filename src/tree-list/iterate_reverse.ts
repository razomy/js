import * as abstractions from '@razomy/abstractions';

export function iterateReverse<T extends abstractions.graph.HasChildren<any[]>>(node: T, cb: (node: T) => void) {
  for (const n of node.children) {
    iterateReverse(n, cb);
  }

  cb(node);
}
