import { Node, SyntaxKind, Expression } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";
import * as random from "@razomy/random";

export function parseUnary(node: Expression, ctx: abstractions.patterns.HasEnterLeave): abstractions.translator.UnaryAsn {
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
    const unaryAsn: abstractions.translator.UnaryAsn = {
      id: random.createUuid(),
      kind: 'UnaryAsn',
      syntaxRole: 'expression',
      operator: operator as abstractions.translator.UnaryAsn['operator'],
      value: null as any,
      isPrefix: true,
    };
    if (!ctx.enter(unaryAsn, node)) return unaryAsn;
    unaryAsn.value = tsRl.as.expressions.parse(node.getOperand(), ctx) as abstractions.translator.StateAsnType;
    return ctx.leave(unaryAsn, node);
  }
  if (Node.isPostfixUnaryExpression(node)) {
    const operator = node.getOperatorToken() === SyntaxKind.PlusPlusToken ? '++' : '--';
    const unaryAsn: abstractions.translator.UnaryAsn = {
      id: random.createUuid(),
      kind: 'UnaryAsn',
      syntaxRole: 'expression',
      operator: operator as abstractions.translator.UnaryAsn['operator'],
      value: null as any,
      isPrefix: false,
    };
    if (!ctx.enter(unaryAsn, node)) return unaryAsn;
    unaryAsn.value = tsRl.as.expressions.parse(node.getOperand(), ctx) as abstractions.translator.StateAsnType;
    return ctx.leave(unaryAsn, node);
  }
  if (Node.isTypeOfExpression(node) || Node.isDeleteExpression(node)) {
    const unaryAsn: abstractions.translator.UnaryAsn = {
      id: random.createUuid(),
      kind: 'UnaryAsn',
      syntaxRole: 'expression',
      operator: Node.isTypeOfExpression(node) ? '+' : '-',
      value: null as any,
      isPrefix: true,
    };
    if (!ctx.enter(unaryAsn, node)) return unaryAsn;
    unaryAsn.value = tsRl.as.expressions.parse(Node.isTypeOfExpression(node) ? node.getExpression() : (node as any).getExpression(), ctx) as abstractions.translator.StateAsnType;
    return ctx.leave(unaryAsn, node);
  }
  throw new tsRl.as.UnknownNodeException(node);
}
