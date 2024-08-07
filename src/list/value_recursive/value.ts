export type ListKey = string
export type ValueListItemValue<T> = ValueRecursiveList<T> | T
export type ValueListItem<T> = [ListKey, ValueListItemValue<T>]
export type ValueRecursiveList<T> = ValueListItem<T>[];
export type ValueRecursiveListOrValueItem<T> = ValueRecursiveList<T> | ValueListItem<T>;

export function getValue<T>(node: ValueListItem<T>): ValueListItemValue<T> {
  return node[1]
}

export function isValueListItem(node: unknown): node is ValueListItem<string> {
  return Array.isArray(node) && node.length === 2 && typeof node[0] === 'string';
}
