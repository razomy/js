import { getItemByPath } from './get_item_by_path';
import type { ListItem } from './get_key';
import * as key from "@razomy/key";

export function get(node: ListItem, path: string) {
  return getItemByPath(node, path.split(key.assign), 0);
}
