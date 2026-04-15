import * as key from '@razomy/key';
import * as kvRecursive from "@razomy/kv-recursive";

export function get(node: kvRecursive.ListItem, path: string) {
  return kvRecursive.getItemByPath(node, path.split(key.ASSIGN), 0);
}
