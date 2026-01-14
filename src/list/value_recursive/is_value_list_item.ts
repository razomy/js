import {ValueListItem} from './value';

export function is_value_list_item(node: unknown): node is ValueListItem<string> {
    return Array.isArray(node) && node.length === 2 && typeof node[0] === 'string';
}
