import { Node, SyntaxKind, Expression } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRala from "@razomy/ts-rala";

export function parseUnary(node: Expression): abstracts.translators.UnaryExpression {
  // 1. Префиксные (++x, !x, -x, ~x)
  if (Node.isPrefixUnaryExpression(node)) {
    let operator = '';
    switch (node.getOperatorToken()) {
      case SyntaxKind.PlusToken: operator = '+'; break;
      case SyntaxKind.MinusToken: operator = '-'; break;
      case SyntaxKind.TildeToken: operator = '~'; break;
      case SyntaxKind.ExclamationToken: operator = '!'; break;
      case SyntaxKind.PlusPlusToken: operator = '++'; break;
      case SyntaxKind.MinusMinusToken: operator = '--'; break;
    }

    return {
      kind: 'UnaryExpression',
      operator: operator as any,
      expression: tsRala.ast.expressions.parse(node.getOperand())!,
      isPrefix: true,
      shape: null,
    };
  }

  // 2. Постфиксные (x++, x--)
  if (Node.isPostfixUnaryExpression(node)) {
    const operator = node.getOperatorToken() === SyntaxKind.PlusPlusToken ? '++' : '--';

    return {
      kind: 'UnaryExpression',
      operator: operator as any,
      expression: tsRala.ast.expressions.parse(node.getOperand())!,
      isPrefix: false,
      shape: null
    };
  }

  // 3. typeof (typeof x)
  if (Node.isTypeOfExpression(node)) {
    return {
      kind: 'UnaryExpression',
      operator: 'typeof',
      expression: tsRala.ast.expressions.parse(node.getExpression())!,
      isPrefix: true,
      shape: null
    };
  }

  // 4. delete (delete x.y)
  if (Node.isDeleteExpression(node)) {
    return {
      kind: 'UnaryExpression',
      operator: 'delete',
      expression: tsRala.ast.expressions.parse(node.getExpression())!,
      isPrefix: true,
      shape: null
    };
  }

  throw new Error(`Unknown Unary "${node.getKindName()}" "${node.getText()}"`);

}
