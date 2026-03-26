import * as abstracts from "@razomy/abstracts";

export function filterPublicDeclaration<T extends abstracts.ast.DeclarationType>(node: T) {
  if (node.isPublic) {
    return node;
  }
  return null;
}
