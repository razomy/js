import {Node, SyntaxKind} from 'ts-morph';
import * as abstracts from '@razomy/abstracts';

export function parseLiteral(targetNode: Node): abstracts.translators.BuildInShape  {
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

  throw new Error(`Unknown Literal "${targetNode.getKindName()}"`);

}
