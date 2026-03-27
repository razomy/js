import { Node, SyntaxKind } from "ts-morph";
import * as abstracts from "@razomy/abstracts";

export function parseLiteralType(node: Node): abstracts.translators.TypeType | null {
    let targetNode = node;
    if (Node.isLiteralTypeNode(node)) {
    targetNode = node.getLiteral();
    }

    const kind = targetNode.getKind();
    if (Node.isStringLiteral(targetNode)) {
    return {
      kind: "StringType",
      value: targetNode.getLiteralValue(),
    } as any;
    }

    if (Node.isNumericLiteral(targetNode)) {
    return {
      kind: "NumberType",
      value: targetNode.getLiteralValue(),
    } as any;
    }

    if (kind === SyntaxKind.TrueKeyword) {
    return {
      kind: "BooleanType",
      value: true,
    } as any;
    }

    if (kind === SyntaxKind.FalseKeyword) {
    return {
      kind: "BooleanType",
      value: false,
    } as any;
    }

    if (kind === SyntaxKind.NullKeyword) {
    return {
      kind: "NullType",
      value: null,
    } as any;
    }

    if (kind === SyntaxKind.UndefinedKeyword) {
    return {
      kind: "UndefinedType",
      value: undefined,
    } as any;
    }

    if (Node.isBigIntLiteral(targetNode)) {
    const text = targetNode.getLiteralText();
    // Remove the trailing "n" character typical in BigInt literals (e.g. "123n" -> "123")
    const value = text.endsWith("n") ? text.slice(0, -1) : text;
    return {
      kind: "BigIntType",
      value,
    } as any;
    }

    if (Node.isRegularExpressionLiteral(targetNode)) {
    return {
      kind: "RegExpType",
      value: targetNode.getLiteralText(), // Returns the raw regex string like "/abc/ig"
    } as any;
    }

    if (Node.isPrefixUnaryExpression(targetNode)) {
    if (targetNode.getOperatorToken() === SyntaxKind.MinusToken) {
      const operand = targetNode.getOperand();

      if (Node.isNumericLiteral(operand)) {
        return {
          kind: "NumberType",
          value: -operand.getLiteralValue(),
        } as any;
      }

      if (Node.isBigIntLiteral(operand)) {
        const text = operand.getLiteralText();
        const value = text.endsWith("n") ? text.slice(0, -1) : text;
        return {
          kind: "BigIntType",
          value: "-" + value,
        } as any;
      }
    }
    }

    return null;
}
