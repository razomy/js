export type ListKey = string;
export type ListItem<T = string> = [ListKey, RecursiveList<T>];
export type RecursiveList<T = string> = ListItem<T>[] | string;

export function getKey(node: ListItem): ListKey {
  return node[0];
}
