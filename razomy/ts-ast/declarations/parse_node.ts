import { Node } from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import { parseVariableDeclaration } from "./parse_variable_declaration";
import { parseTypeAliasDeclaration } from "./parse_type_alias_declaration";
import { parseInterfaceDeclaration } from "./parse_interface_declaration";
import { parseFunctionDeclaration } from "./parse_function_declaration";
import { parseEnumDeclaration } from "./parse_enum_declaration";

/**
 * Recursively parses general TS Nodes (Declarations, Statements)
 */
export function parseNode(node: Node): abstracts.ast.DeclarationType | null {
    if (Node.isVariableStatement(node)) {
    return parseNode(node.getDeclarations()[0]);
    }

    if (Node.isVariableDeclaration(node)) {
    return parseVariableDeclaration(node);
    }

    if (Node.isTypeAliasDeclaration(node)) {
    return parseTypeAliasDeclaration(node);
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
    return null;
    // return {
    //   kind: 'DependencyExpression',
    //   identifier: {kind: 'Identifier', name: node.getText()},
    //   version: '',
    // } satisfies abstracts.ast.DependencyExpression;
  }

  if (Node.isStatement(node)) {
    return null;
  }

  throw new Error(`Unknown Declaration ${node.getKindName()} '${node.getText()}'`);
}
