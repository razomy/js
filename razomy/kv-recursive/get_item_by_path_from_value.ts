import {getItemByPath} from './get_item_by_path';
import {getKey, type ListItem, type RecursiveList} from './get_key';
import * as exceptions from '@razomy/exceptions';
import * as string from '@razomy/string';

export function getItemByPathFromValue(value: RecursiveList, path: string[], offset: number) {
  if (string.isString(value)) {
    return [value, ''] as ListItem <string>;
  }
  for (const node of value) {
    const key = getKey(node);
    if (key !== path[offset]) {
      continue;
    }

    return getItemByPath(node, path, offset + 1);
  }

  throw new exceptions.ArgumentException('invalid arguments', {value, path, offset});
}
