import { WithChildrenDict } from 'razomy.trees/dict/with_children_dict';
import get from './get';

export default function get_by_string<T extends WithChildrenDict<T>>(node: T, path: string, separator: string) {
    return get(node, path.split(separator), 0);
}
