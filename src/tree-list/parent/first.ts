import * as abstractions from "@razomy/abstractions";

export function first<T extends abstractions.graph.HasParent<T | null>>(node: T, cb: (node: T) => boolean) {
  if (cb(node)) {
    return node;
  }

  if (node.parent == null) {
    return null;
  }

  return first(node.parent, cb);
}
