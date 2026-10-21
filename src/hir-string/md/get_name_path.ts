import * as abstractions from '@razomy/abstractions';

export function getNamePath(node: abstractions.hir.IIdentityHirn) {
  const path = [] as string[];
  while (node.parent) {
    if (node.name && node.modifiers && node.modifiers.isPublic) {
      path.push(node.name);
    }
    node = node.parent as abstractions.hir.IIdentityHirn;
  }

  return path.filter(Boolean);
}
