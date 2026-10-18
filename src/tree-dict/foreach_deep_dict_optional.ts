import * as abstractions from "@razomy/abstractions";

export function foreachDeepDictOptional<T extends abstractions.graph.HasChildrenDict<any>>(node: T, cb: (node: T) => void) {
  cb(node);
  for (const n in node.children || {}) {
    foreachDeepDictOptional<T>(node.children[n], cb);
  }
}
