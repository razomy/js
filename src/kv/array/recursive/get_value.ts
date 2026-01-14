import {ListItem, RecursiveList} from './type';

export default function get_value(node: ListItem): RecursiveList {
    return node[1]
}
