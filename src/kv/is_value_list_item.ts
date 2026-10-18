export function isValueListItem(node: unknown): node is [string, any] {
  return Array.isArray(node) && node.length === 2 && typeof node[0] === 'string';
}
