import { WithChildrenDict } from 'razomy.tree/dict/with_children_dict';
import {get} from './get';

export function get_by_string<T extends WithChildrenDict<T>>(node: T, path: string, separator: string) {
    return get(node, path.split(separator), 0);
}
