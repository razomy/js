import type {ListItem, RecursiveList} from './get_key';

export function getValue(node: ListItem): RecursiveList {
  return node[1]
}
