import * as exceptions from '@razomy/exceptions';
import * as string from '@razomy/string';
import * as kvRecursive from "@razomy/kv-recursive";

export function getItemByPathFromValue(value: kvRecursive.RecursiveList, path: string[], offset: number) {
  if (string.isString(value)) {
    return [value, ''] as kvRecursive.ListItem <string>;
  }
  for (const node of value) {
    const key = kvRecursive.getKey(node);
    if (key !== path[offset]) {
      continue;
    }

    return kvRecursive.getItemByPath(node, path, offset + 1);
  }

  throw new exceptions.ArgumentException('invalid arguments', {value, path, offset});
}
