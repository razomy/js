import * as kvRecursive from '@razomy/kv-recursive';

export function getItemByPath(node: kvRecursive.ListItem, path: string[], offset: number): kvRecursive.ListItem {
  if (offset >= path.length) {
    return node;
  }

  const value = kvRecursive.getValue(node);
  return kvRecursive.getItemByPathFromValue(value, path, offset);
}
