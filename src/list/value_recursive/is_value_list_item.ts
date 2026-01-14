import {ValueListItem} from './value';

export default function is_value_list_item(node: unknown): node is ValueListItem<string> {
    return Array.isArray(node) && node.length === 2 && typeof node[0] === 'string';
}
