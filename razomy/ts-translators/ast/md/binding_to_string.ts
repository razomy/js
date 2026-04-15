import * as abstracts from "@razomy/abstracts";
import * as tsTranslators from "@razomy/ts-translators";

export function bindingToString(nodes: abstracts.translators.SbsbType[], currentPath: string[], result: tsTranslators.ast.md.FlatDeclaration[] = []) {
  for (const node of nodes) {
    if (node.kind === 'ModuleBinding') {
      bindingToString(node.body, [...currentPath, node.identifier.name], result);
    } else if (node.kind === 'FunctionBinding') {
      result.push({
        node: node,
        description: node.meta.description,
        name: node.identifier.name,
        path: [...currentPath, node.identifier.name]
      });
    } else if (node.kind === 'ClassBinding') {
      result.push({
        node: node,
        description: node.meta.description,
        name: node.identifier.name,
        path: [...currentPath, node.identifier.name]
      });
    } else if (node.kind === 'VariableBinding') {
      result.push({
        node: node,
        description: node.meta.description,
        name: node.identifier.name,
        path: [...currentPath, node.identifier.name]
      });
    } else if (node.kind === 'EnumBinding') {
      result.push({
        node: node,
        description: node.meta.description,
        name: node.identifier.name,
        path: [...currentPath, node.identifier.name]
      });
    } else if (node.kind === 'InterfaceShapeBinding') {
      result.push({
        node: node,
        description: node.meta.description,
        name: node.shapeIdentifier.name,
        path: [...currentPath, node.shapeIdentifier.name]
      });
    } else if (node.kind === 'AliasShapeBinding') {
      result.push({
        node: node,
        description: node.meta.description,
        name: node.shapeIdentifier.name,
        path: [...currentPath, node.shapeIdentifier.name]
      });
    }
  }

  return result;
}
