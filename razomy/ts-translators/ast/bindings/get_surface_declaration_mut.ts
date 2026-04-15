import * as abstracts from '@razomy/abstracts';

export function getSurfaceDeclarationMut<T extends abstracts.translators.SbsbType>(node: T) {
  if (node.kind === 'FunctionBinding') {
    node.body = [];
  }

  if (node.kind === 'PackageBinding') {
    node.body = node.body.map(getSurfaceDeclarationMut);
  }

  if (node.kind === 'ModuleBinding') {
    node.body = node.body.map(getSurfaceDeclarationMut);
  }

  return node;
}
