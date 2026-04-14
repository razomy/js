import {Node} from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import {parseVariableBinding} from "./parse_variable_binding";
import {parseTypeAliasBinding} from "./parse_type_alias_binding";
import {parseInterfaceDeclaration} from "../shapeBindings";
import {parseFunctionDeclaration} from "./parse_function_declaration";
import {parseEnumDeclaration} from "./parse_enum_declaration";

/**
 * Recursively parses general TS Nodes (Declarations, Statements)
 */
export function parseBinding(node: Node): abstracts.translators.SbsbType | null {
  if (Node.isVariableStatement(node)) {
    return parseBinding(node.getDeclarations()[0]);
  }

  if (Node.isVariableDeclaration(node)) {
    return parseVariableBinding(node);
  }

  if (Node.isTypeAliasDeclaration(node)) {
    return parseTypeAliasBinding(node);
  }

  if (Node.isInterfaceDeclaration(node)) {
    return parseInterfaceDeclaration(node);
  }

  if (Node.isEnumDeclaration(node)) {
    return parseEnumDeclaration(node);
  }

  if (Node.isFunctionDeclaration(node)) {
    return parseFunctionDeclaration(node);
  }

  if (Node.isImportDeclaration(node)) {
    const allNames = node.getNamedImports().map(ni => ni.getName());

    return {
      kind: 'DependencyBinding',
      identifier: {kind: 'Identifier', name: allNames[0]},
      version: '',
      path: node.getModuleSpecifierValue(),
    } satisfies abstracts.translators.DependencyBinding;
  }

  if (Node.isStatement(node)) {
    return null;
  }

  throw new Error(`Unknown Declaration ${node.getKindName()} '${node.getText()}'`);
}
