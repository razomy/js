import {WithChildrenDict} from 'razomy.tree.dict';

export function foreachDeepDictOptional<T extends WithChildrenDict<any>>(node: T, cb: (node: T) => void) {
  cb(node);
  for (const n in node.children || {}) {
    foreachDeepDictOptional<T>(node.children[n], cb);
  }
}
