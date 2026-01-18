import {ArgumentException} from 'razomy.exceptions';
import {getKey, RecursiveList} from 'razomy.kv.array.recursive';
import {getItemByPath} from './get_item_by_path';

export function getItemByPathFromValue(value: RecursiveList, path: string[], offset: number) {
  for (let node of value) {
    const key = getKey(node);
    if (key !== path[offset]) {
      continue;
    }

    return getItemByPath(node, path, offset + 1)
  }

  throw new ArgumentException('invalid arguments', {value, path, offset})
}
