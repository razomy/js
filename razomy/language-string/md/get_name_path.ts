import * as abstractions from '@razomy/abstractions';

export function getNamePath(node: abstractions.translators.IHirNode) {
  const path = [] as string[];
  while (node.parent) {
    if (node['name'] && node['modifiers'] && node['modifiers'].has(i=>i.value === 'public')) {
      path.push(node['name'] || null);
    }
    node = node.parent;
  }

  return path.filter(Boolean);
}
