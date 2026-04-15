import { Node, SyntaxKind } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';

export function parseLiteralType(node: Node): abstracts.translators.BuildInShape | null {
  let targetNode = node;
  if (Node.isLiteralTypeNode(node)) {
    targetNode = node.getLiteral();
  }

  const kind = targetNode.getKind();

  if (Node.isStringLiteral(targetNode)) {
    return {
      kind: 'BuildInShape',
      type: 'String',
      value: targetNode.getLiteralValue(), // Уже строка
    };
  }

  if (Node.isNumericLiteral(targetNode)) {
    return {
      kind: 'BuildInShape',
      type: 'Number',
      value: targetNode.getLiteralValue().toString(), // Приводим к строке
    };
  }

  if (kind === SyntaxKind.TrueKeyword) {
    return {
      kind: 'BuildInShape',
      type: 'Boolean',
      value: 'true', // Приводим к строке
    };
  }

  if (kind === SyntaxKind.FalseKeyword) {
    return {
      kind: 'BuildInShape',
      type: 'Boolean',
      value: 'false', // Приводим к строке
    };
  }

  if (kind === SyntaxKind.NullKeyword) {
    return {
      kind: 'BuildInShape',
      type: 'Null',
      value: null, // null разрешен интерфейсом
    };
  }

  if (kind === SyntaxKind.UndefinedKeyword) {
    return {
      kind: 'BuildInShape',
      type: 'Undefined',
      value: 'undefined', // undefined не разрешен в value, пишем строку
    };
  }

  if (Node.isBigIntLiteral(targetNode)) {
    const text = targetNode.getLiteralText();
    const value = text.endsWith('n') ? text.slice(0, -1) : text;
    return {
      kind: 'BuildInShape',
      type: 'Bigint',
      value, // Уже строка
    };
  }

  if (Node.isRegularExpressionLiteral(targetNode)) {
    return {
      kind: 'BuildInShape',
      // В новом интерфейсе нет типа 'RegExp', мапим в 'Object'
      type: 'Object',
      value: targetNode.getLiteralText(),
    };
  }

  if (Node.isPrefixUnaryExpression(targetNode)) {
    if (targetNode.getOperatorToken() === SyntaxKind.MinusToken) {
      const operand = targetNode.getOperand();

      if (Node.isNumericLiteral(operand)) {
        return {
          kind: 'BuildInShape',
          type: 'Number',
          value: (-operand.getLiteralValue()).toString(), // Отрицательное число в строку
        };
      }

      if (Node.isBigIntLiteral(operand)) {
        const text = operand.getLiteralText();
        const value = text.endsWith('n') ? text.slice(0, -1) : text;
        return {
          kind: 'BuildInShape',
          type: 'Bigint',
          value: '-' + value,
        };
      }
    }
  }

  return null;
}
