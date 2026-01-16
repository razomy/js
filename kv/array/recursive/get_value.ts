import {ListItem, RecursiveList} from './get_key';

export function get_value(node: ListItem): RecursiveList {
    return node[1]
}
