export type ListKey = string
export type ListItem = [ListKey, RecursiveList]
export type RecursiveList = ListItem[];

export function getKey(node: ListItem): ListKey {
  return node[0]
}

export function getValue(node: ListItem): RecursiveList {
  return node[1]
}
