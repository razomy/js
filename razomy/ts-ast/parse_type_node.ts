import { Node, SyntaxKind, TypeNode } from "ts-morph";
import type { Any, Generic, Reference, Unknown } from "../abstracts/ast/ast";
import {parseProperty} from "./parse_property";

/**
 * Parses TS Type Nodes (string, number, unions, intersections, literals, objects, arrays)
 */
export function parseTypeNode(node: TypeNode | Node | any): Any {
    if (node.isKind(SyntaxKind.StringKeyword)) return {kind: 'String'};
    if (node.isKind(SyntaxKind.NumberKeyword)) return {kind: 'Number'};
    if (node.isKind(SyntaxKind.BooleanKeyword)) return {kind: 'Boolean'};
    if (node.isKind(SyntaxKind.VoidKeyword)) return {kind: 'Void'};
    if (node.isKind(SyntaxKind.AnyKeyword)) return {kind: 'Unknown', tsSyntaxKey: 'AnyKeyword'} as Unknown;
    if (Node.isLiteralTypeNode(node)) {
    const literal = node.getLiteral();
    if (Node.isStringLiteral(literal)) return {kind: 'StringLiteral', value: literal.getLiteralValue()};
    if (Node.isNumericLiteral(literal)) return {kind: 'NumberLiteral', value: literal.getLiteralValue()};
    if (Node.isTrueLiteral(literal)) return {kind: 'BooleanLiteral', value: true};
    if (Node.isFalseLiteral(literal)) return {kind: 'BooleanLiteral', value: false};
    }

    if (Node.isArrayTypeNode(node)) {
    return {
      kind: 'Array',
      item: parseTypeNode(node.getElementTypeNode())
    };
    }

    if (Node.isTupleTypeNode(node)) {
    return {
      kind: 'Tuple',
      items: node.getElements().map(el => parseTypeNode(el))
    };
    }

    if (Node.isUnionTypeNode(node)) {
    return {
      kind: 'Union',
      item: node.getTypeNodes().map(t => parseTypeNode(t))
    };
    }

    if (Node.isIntersectionTypeNode(node)) {
    return {
      kind: 'Intersection',
      item: node.getTypeNodes().map(t => parseTypeNode(t))
    };
    }

    if (Node.isTypeLiteral(node)) {
    return {
      kind: 'Object',
      items: node.getProperties().map(p => parseProperty(p))
    };
    }

    if (Node.isTypeReference(node)) {
    const typeName = node.getTypeName().getText();
    const typeArgs = node.getTypeArguments();

    const baseRef: Reference = {kind: 'Reference', key: typeName};

    if (typeArgs.length > 0) {
      return {
        kind: 'Generic',
        base: baseRef,
        items: typeArgs.map(arg => parseTypeNode(arg))
      } as Generic;
    }

    return baseRef;
    }

    return {kind: 'Unknown', tsSyntaxKey: node.getKindName()};
}
