import { Node } from "ts-morph";
import {parseDescription} from "./parse_description";

import * as abstracts from "@razomy/abstracts";

/**
 * Helper to parse properties inside objects/interfaces
 */
export function parseProperty(node: Node): abstracts.translators.PropertyDeclaration {
    let name = '';
    // let typeNode: TypeNode | undefined;
    // let initNode: Node | undefined;
    if (Node.isPropertySignature(node) || Node.isPropertyDeclaration(node)) {
    name = node.getName();
    // typeNode = node.getTypeNode();
    // initNode = node.getInitializer();
    }

    return {
    kind: 'Property',
    name: name,
    description: parseDescription(node)!,
    // item: typeNode ? parseTypeNode(typeNode) : {kind: 'Unknown', tsSyntaxKind: 'ImplicitAny'} as any,
    // value: initNode ? parseLiteral(initNode) : null
    } as any;
}
