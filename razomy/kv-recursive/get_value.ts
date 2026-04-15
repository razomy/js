import * as kvRecursive from "@razomy/kv-recursive";

export function getValue(node: kvRecursive.ListItem): kvRecursive.RecursiveList {
  return node[1];
}
