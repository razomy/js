import * as abstracts from "@razomy/abstracts";
import type {FlatDeclaration} from "./function_to_string";

export function collectDeclarations(nodes: abstracts.translators.AstLeafType[], currentPath: string[], result: FlatDeclaration[] = []) {
    for (const node of nodes) {
    if (node.kind === 'ModuleBinding') {
      collectDeclarations(node.body, [...currentPath, node.identifier.name], result);
    } else if (node.kind === 'FunctionBinding') {
      result.push({
        node: node,
        description: node.description,
        name: node.identifier.name,
        path: [...currentPath, node.identifier.name]
      });
    } else if (node.kind === 'InterfaceTypeBinding') {
      result.push({
        node: node,
        description: node.description,
        name: node.typeIdentifier.name,
        path: [...currentPath, node.typeIdentifier.name]
      });
    } else if (node.kind === 'ClassBinding') {
      result.push({
        node: node,
        description: node.description,
        name: node.identifier.name,
        path: [...currentPath, node.identifier.name]
      });
    } else if (node.kind === 'VariableBinding') {
      result.push({
        node: node,
        description: node.description,
        name: node.identifier.name,
        path: [...currentPath, node.identifier.name]
      });
    } else if (node.kind === 'EnumBinding') {
      result.push({
        node: node,
        description: node.description,
        name: node.identifier.name,
        path: [...currentPath, node.identifier.name]
      });
    } else if (node.kind === 'AliasTypeBinding') {
      result.push({
        node: node,
        description: node.description,
        name: node.typeIdentifier.name,
        path: [...currentPath, node.typeIdentifier.name]
      });
    }
    }

    return result;
}
