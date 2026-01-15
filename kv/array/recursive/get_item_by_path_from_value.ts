import { ArgumentException } from 'razomy.exceptions/argument_exception';
import  { get_key, RecursiveList } from 'razomy.kv/array/recursive/type';
import {get_item_by_path} from './get_item_by_path';

export function get_item_by_path_from_value(value: RecursiveList, path: string[], offset: number) {
    for (let node of value) {
    const key = get_key(node);
    if (key !== path[offset]) {
      continue;
    }

    return get_item_by_path(node, path, offset + 1)
    }

    throw new ArgumentException('invalid arguments', {value, path, offset})
}
