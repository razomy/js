import {WithChildrenDict} from "razomy/trees/dict/with_children_dict";

export function iterate<T extends WithChildrenDict<any>>(node: T, cb: (node: T) => void) {
  cb(node);
  for (const n in node.children) {
    iterate<T>(node.children[n], cb);
  }
}

export function ForeachDeepDictOptional<T extends WithChildrenDict<any>>(node: T, cb: (node: T) => void) {
  cb(node);
  for (const n in node.children || {}) {
    ForeachDeepDictOptional<T>(node.children[n], cb);
  }
}