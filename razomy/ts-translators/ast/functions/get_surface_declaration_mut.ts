import * as abstracts from "@razomy/abstracts";

export function getSurfaceDeclarationMut<T extends abstracts.translators.AstLeafType>(node: T) {
  if (node.kind === 'FunctionBinding') {
    node.body = null;
  }

  if (node.kind === 'PackageBinding') {
    node.body = node.body.map(getSurfaceDeclarationMut);
  }

  if (node.kind === 'ModuleBinding') {
    node.body = node.body.map(getSurfaceDeclarationMut);
  }

  return node;
}
