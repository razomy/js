import { Node } from "ts-morph";
import type { NumberLiteral, StringLiteral, BooleanLiteral, Literal } from "../abstracts/ast/ast";

/**
 * Helper to extract raw values from literal nodes (for assignments/values)
 */
export function parseLiteral(node: Node): Literal | null {
    if (Node.isStringLiteral(node) || Node.isNoSubstitutionTemplateLiteral(node)) {
    return {kind: 'StringLiteral', value: node.getLiteralValue()} as StringLiteral;
    }

    if (Node.isNumericLiteral(node)) {
    return {kind: 'NumberLiteral', value: node.getLiteralValue()} as NumberLiteral;
    }

    if (Node.isTrueLiteral(node)) {
    return {kind: 'BooleanLiteral', value: true} as BooleanLiteral;
    }

    if (Node.isFalseLiteral(node)) {
    return {kind: 'BooleanLiteral', value: false} as BooleanLiteral;
    }

    return null;
}
