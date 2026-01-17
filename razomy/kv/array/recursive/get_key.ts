export type ListKey = string
export type ListItem = [ListKey, RecursiveList]
export type RecursiveList = ListItem[];

export function getKey(node: ListItem): ListKey {
  return node[0]
}
