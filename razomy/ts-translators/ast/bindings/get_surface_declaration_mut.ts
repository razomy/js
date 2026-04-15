import * as abstracts from '@razomy/abstracts';

export function getSurfaceDeclarationMut<T extends abstracts.translators.DeclarationType>(node: T) {
  if (node.kind === 'FunctionBinding') {
    node.block.declarations = [];
  }

  if (node.kind === 'PackageBinding') {
    node.block.declarations = node.block.declarations.map(getSurfaceDeclarationMut);
  }

  if (node.kind === 'ModuleBinding') {
    node.block.declarations = node.block.declarations.map(getSurfaceDeclarationMut);
  }

  return node;
}
