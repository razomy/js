export type ListKey = string
export type ListItem = [ListKey, RecursiveList]
export type RecursiveList = ListItem[];

export function get_key(node: ListItem): ListKey {
  return node[0]
}

export function get_value(node: ListItem): RecursiveList {
  return node[1]
}
