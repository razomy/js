import * as dict from '@razomy/dict';
import * as kvRecursive from '@razomy/kv-recursive';

export function get(node: kvRecursive.ListItem, path: string) {
  return kvRecursive.getItemByPath(node, path.split(dict.ASSIGN), 0);
}
