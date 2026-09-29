import { Node, SyntaxKind, Expression } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseUnary(node: Expression, ctx: tsRl.ast.HasEnterLeaveProduce): abstracts.translators.UnaryAst {
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
      kind: 'UnaryAst', syntaxRole: 'expression',
      operator: operator as abstracts.translators.UnaryAst['operator'],
      value: tsRl.ast.expressions.parse(node.getOperand(), ctx) as abstracts.translators.StateAstType,
      isPrefix: true,
    };
  }
  if (Node.isPostfixUnaryExpression(node)) {
    const operator = node.getOperatorToken() === SyntaxKind.PlusPlusToken ? '++' : '--';
    return {
      kind: 'UnaryAst', syntaxRole: 'expression',
      operator: operator as abstracts.translators.UnaryAst['operator'],
      value: tsRl.ast.expressions.parse(node.getOperand(), ctx) as abstracts.translators.StateAstType,
      isPrefix: false,
    };
  }
  if (Node.isPostfixUnaryExpression(node)) {
    const operator = node.getOperatorToken() === SyntaxKind.PlusPlusToken ? '++' : '--';
    return {
      kind: 'UnaryAst', syntaxRole: 'expression',
      operator: operator as abstracts.translators.UnaryAst['operator'],
      value: tsRl.ast.expressions.parse(node.getOperand(), ctx) as abstracts.translators.StateAstType,
      isPrefix: false,
    };
  }
  if (Node.isTypeOfExpression(node) || Node.isDeleteExpression(node)) {
    return {
      kind: 'UnaryAst', syntaxRole: 'expression',
      operator: Node.isTypeOfExpression(node) ? '+' : '-',
      value: tsRl.ast.expressions.parse(Node.isTypeOfExpression(node) ? node.getExpression() : (node as any).getExpression(), ctx) as abstracts.translators.StateAstType,
      isPrefix: true,
    };
  }
  throw new tsRl.ast.UnknownNodeException(node)
}
