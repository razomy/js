import { Node } from "ts-morph";

export function isShape(node: Node) {
    return (
    Node.isArrayTypeNode(node) ||
    Node.isUnionTypeNode(node) ||
    Node.isIntersectionTypeNode(node) ||
    Node.isTypeLiteral(node) ||
    Node.isTypeReference(node) ||
    Node.isPropertySignature(node)
    );
}
