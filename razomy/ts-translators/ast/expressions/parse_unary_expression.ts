import { Node, SyntaxKind, Expression } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsTranslators from '@razomy/ts-translators';

export function parseUnaryExpression(node: Expression): abstracts.translators.UnaryExpression | null {
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
      expression: tsTranslators.ast.expressions.parseExpression(node.getOperand())!,
      isPrefix: true,
    };
  }

  // 2. Постфиксные (x++, x--)
  if (Node.isPostfixUnaryExpression(node)) {
    const operator = node.getOperatorToken() === SyntaxKind.PlusPlusToken ? '++' : '--';

    return {
      kind: 'UnaryExpression',
      operator: operator as any,
      expression: tsTranslators.ast.expressions.parseExpression(node.getOperand())!,
      isPrefix: false,
    };
  }

  // 3. typeof (typeof x)
  if (Node.isTypeOfExpression(node)) {
    return {
      kind: 'UnaryExpression',
      operator: 'typeof',
      expression: tsTranslators.ast.expressions.parseExpression(node.getExpression())!,
      isPrefix: true,
    };
  }

  // 4. delete (delete x.y)
  if (Node.isDeleteExpression(node)) {
    return {
      kind: 'UnaryExpression',
      operator: 'delete',
      expression: tsTranslators.ast.expressions.parseExpression(node.getExpression())!,
      isPrefix: true,
    };
  }

  return null;
}
