import { ArgumentException } from 'razomy.exceptions/argument_exception';
import { WithChildrenDict } from 'razomy.trees/dict/with_children_dict';
import {get} from './get';

export function get_value<T extends WithChildrenDict<T>>(value: T, path: string[], offset: number) {
    for (let key in value.children) {
    if (key !== path[offset]) {
      continue;
    }

    return get(value.children[key], path, offset + 1)
    }

    throw new ArgumentException('Node not found path.invalid arguments', {value, path, offset})
}
