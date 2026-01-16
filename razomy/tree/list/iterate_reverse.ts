import { WithChildrenList } from 'razomy.tree/list/with_children_list';

export function iterate_reverse<T extends WithChildrenList<any>>(node: T, cb: (node: T) => void) {
    for (const n of node.children) {
    iterate_reverse(n, cb);
    }

    cb(node);
}
