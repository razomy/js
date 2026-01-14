import {ListItem, RecursiveList} from './type';

export function get_value(node: ListItem): RecursiveList {
    return node[1]
}
