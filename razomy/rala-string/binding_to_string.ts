import * as abstracts from '@razomy/abstracts';
import * as ralaString from '@razomy/rala-string';

export function bindingToString(
  nodes: abstracts.translators.DeclarationType[],
  currentPath: string[],
  result: ralaString.FlatDeclaration[] = [],
) {
  for (const node of nodes) {
    if (node.kind === 'ModuleBinding') {
      bindingToString(node.block.declarations, [...currentPath, node.identifier.name], result);
    } else if (node.kind === 'FunctionBinding') {
      result.push({
        node: node,
        description: node.meta.description,
        name: node.identifier.name,
        path: [...currentPath, node.identifier.name],
      });
    } else if (node.kind === 'ClassBinding') {
      result.push({
        node: node,
        description: node.meta.description,
        name: node.identifier.name,
        path: [...currentPath, node.identifier.name],
      });
    } else if (node.kind === 'VariableBinding') {
      result.push({
        node: node,
        description: node.meta.description,
        name: node.identifier.name,
        path: [...currentPath, node.identifier.name],
      });
    } else if (node.kind === 'EnumBinding') {
      result.push({
        node: node,
        description: node.meta.description,
        name: node.identifier.name,
        path: [...currentPath, node.identifier.name],
      });
    } else if (node.kind === 'InterfaceShapeBinding') {
      result.push({
        node: node,
        description: node.meta.description,
        name: node.shapeIdentifier.name,
        path: [...currentPath, node.shapeIdentifier.name],
      });
    } else if (node.kind === 'AliasShapeBinding') {
      result.push({
        node: node,
        description: node.meta.description,
        name: node.shapeIdentifier.name,
        path: [...currentPath, node.shapeIdentifier.name],
      });
    } else if (node.kind === 'DependencyBinding') {
    } else {
      throw new Error(`Unknown Biding "${node.kind}"`);
    }
  }

  return result;
}
