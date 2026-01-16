import { WithChildrenDict } from 'razomy.tree/dict/with_children_dict';

export function foreach_deep_dict_optional<T extends WithChildrenDict<any>>(node: T, cb: (node: T) => void) {
    cb(node);
    for (const n in node.children || {}) {
    foreach_deep_dict_optional<T>(node.children[n], cb);
    }
}
