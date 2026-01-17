import {ValueListItem} from './get_value';

export function isValueListItem(node: unknown): node is ValueListItem<string> {
  return Array.isArray(node) && node.length === 2 && typeof node[0] === 'string';
}
