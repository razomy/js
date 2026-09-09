import { Node, SyntaxKind, Expression } from 'ts-morph';
import * as translators from '@razomy/abstracts/translators';
import { parse } from './parse';

export function parseUnary(node: Expression): translators.UnaryAst {
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
      kind: 'UnaryAst', syntaxLayer: 2,
      operator: operator as translators.UnaryAst['operator'],
      value: parse(node.getOperand()) as translators.StateAstType,
      isPrefix: true,
    };
  }
  if (Node.isPostfixUnaryExpression(node)) {
    const operator = node.getOperatorToken() === SyntaxKind.PlusPlusToken ? '++' : '--';
    return {
      kind: 'UnaryAst', syntaxLayer: 2,
      operator: operator as translators.UnaryAst['operator'],
      value: parse(node.getOperand()) as translators.StateAstType,
      isPrefix: false,
    };
  }
  if (Node.isTypeOfExpression(node) || Node.isDeleteExpression(node)) {
    return {
      kind: 'UnaryAst', syntaxLayer: 2,
      operator: Node.isTypeOfExpression(node) ? '+' : '-',
      value: parse(Node.isTypeOfExpression(node) ? node.getExpression() : (node as any).getExpression()) as translators.StateAstType,
      isPrefix: true,
    };
  }
  throw new Error(`Unknown Unary`);
}
