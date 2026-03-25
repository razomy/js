import { Node, TypeNode } from "ts-morph";
import {getJsDocDescription} from "./get_js_doc_description";
import {parseTypeNode} from "./parse_type_node";
import {parseLiteral} from "./parse_literal";
import * as abstracts from "@razomy/abstracts";

/**
 * Helper to parse properties inside objects/interfaces
 */
export function parseProperty(node: Node): abstracts.ast.Property {
    let name = '';
    let typeNode: TypeNode | undefined;
    let initNode: Node | undefined;
    if (Node.isPropertySignature(node) || Node.isPropertyDeclaration(node)) {
    name = node.getName();
    typeNode = node.getTypeNode();
    initNode = node.getInitializer();
    }

    return {
    kind: 'Property',
    name: name,
    description: getJsDocDescription(node)!,
    item: typeNode ? parseTypeNode(typeNode) : {kind: 'Unknown', tsSyntaxKind: 'ImplicitAny'} as abstracts.ast.Unknown,
    value: initNode ? parseLiteral(initNode) : null
    };
}
