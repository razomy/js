import { WithChildrenList } from 'razomy.trees/list/with_children_list';

export default function iterate_reverse<T extends WithChildrenList<any>>(node: T, cb: (node: T) => void) {
    for (const n of node.children) {
    iterate_reverse(n, cb);
    }

    cb(node);
}
