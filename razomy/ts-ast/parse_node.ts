import {Node} from "ts-morph";
import type {Any, Tuple, Type, Unknown, Variable} from "../abstracts/ast/ast";

import {parseTypeNode} from "./parse_type_node";
import {parseLiteral} from "./parse_literal";
import {parseProperty} from "./parse_property";
import {getJsDocDescription} from "./get_js_doc_description";
import {parseFunction} from "./parse_function";


/**
 * Recursively parses general TS Nodes (Declarations, Statements)
 */
export function parseNode(node: Node): Any | Any[] | null {
  if (Node.isVariableStatement(node)) {
    return node.getDeclarations().map(decl => parseNode(decl) as Variable);
  }

  if (Node.isVariableDeclaration(node)) {
    const typeNode = node.getTypeNode();
    const initNode = node.getInitializer();
    return {
      kind: 'Variable',
      key: node.getName(),
      item: typeNode ? parseTypeNode(typeNode) : {kind: 'Unknown', tsSyntaxKey: 'InferredType'} as Unknown,
      value: initNode ? parseLiteral(initNode) : null
    };
  }

  if (Node.isTypeAliasDeclaration(node)) {
    return {
      kind: 'Type',
      key: node.getName(),
      value: parseTypeNode(node.getTypeNode()!)
    };
  }

  if (Node.isInterfaceDeclaration(node)) {
    return {
      kind: 'Type',
      key: node.getName(),
      value: {
        kind: 'Object',
        items: node.getProperties().map(p => parseProperty(p))
      }
    } as Type;
  }

  if (Node.isFunctionDeclaration(node) && Node.isExportable(node) && node.isExported()) {
    return parseFunction(node);
  }
  if (Node.isFunctionDeclaration(node) || Node.isMethodDeclaration(node)) {

    const params = node.getParameters();
    const returnType = node.getReturnTypeNode();

    // Simulating parameter as a tuple/object based on your definitions
    const parameterDecl: Tuple = {
      kind: 'Tuple',
      items: params.map(p => {
        const pType = p.getTypeNode();
        return pType ? parseTypeNode(pType) : {kind: 'Unknown', tsSyntaxKey: 'ImplicitAny'} as Unknown;
      })
    };

    return {
      kind: 'Function',
      name: node.getName() || 'anonymous',
      description: getJsDocDescription(node)!,
      parameter: parameterDecl,
      return_: returnType ? parseTypeNode(returnType) : {kind: 'Void'}
    };
  }

  return null;
}


