import { Node, Statement } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as tsRl from '@razomy/ts-rl';

export function parse(node: Statement, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.AsnType {
  if (Node.isBlock(node)) {
    return ctx.leave(
      { kind: 'BlockAsn', syntaxRole: 'statement', statements: tsRl.ast.declarations.parseModuleBody(node,ctx) },
      node,
    );
  }
  if (Node.isIfStatement(node)) return tsRl.ast.statements.parseCondition(node,ctx);
  if (Node.isSwitchStatement(node)) return tsRl.ast.statements.parseSwitch(node,ctx);
  if (Node.isTryStatement(node))
    return {
      kind: 'TryAsn',
      syntaxRole: 'statement',
      block: tsRl.ast.statements.parse(node.getTryBlock(), ctx),
    } as abstractions.translators.TryAsn;
  if (Node.isForStatement(node)) {
    return {
      kind: 'ForItAsn',
      syntaxRole: 'statement',
      init: node.getInitializer() ? tsRl.ast.parseNode(node.getInitializer()!, ctx) : null,
      condition: node.getCondition() ? tsRl.ast.expressions.parse(node.getCondition()!, ctx) : null,
      update: node.getIncrementor() ? tsRl.ast.expressions.parse(node.getIncrementor()!, ctx) : null,
      block: tsRl.ast.statements.parse(node.getStatement(), ctx),
    } as abstractions.translators.ForItAsn;
  }
  if (Node.isWhileStatement(node)) {
    return {
      kind: 'WhileDoAsn',
      syntaxRole: 'statement',
      condition: tsRl.ast.expressions.parse(node.getExpression(), ctx),
      block: tsRl.ast.statements.parse(node.getStatement(), ctx),
    } as abstractions.translators.WhileDoAsn;
  }
  if (Node.isDoStatement(node)) {
    return {
      kind: 'DoWhileAsn',
      syntaxRole: 'statement',
      condition: tsRl.ast.expressions.parse(node.getExpression(), ctx),
      block: tsRl.ast.statements.parse(node.getStatement(), ctx),
    } as abstractions.translators.DoWhileAsn;
  }
  if (Node.isForOfStatement(node)) {
    return {
      kind: 'ForOfAsn',
      syntaxRole: 'statement',
      init: tsRl.ast.expressions.parse(node.getExpression(), ctx),
      block: tsRl.ast.statements.parse(node.getStatement(), ctx),
    } as abstractions.translators.ForOfAsn;
  }
  if (Node.isForInStatement(node)) {
    return {
      kind: 'ForInAsn',
      syntaxRole: 'statement',
      init: null,
      condition: null,
      update: null,
      block: tsRl.ast.statements.parse(node.getStatement(), ctx),
    } as abstractions.translators.ForIAsn;
  }
  if (Node.isReturnStatement(node)) return tsRl.ast.statements.parseReturn(node,ctx);
  if (Node.isBreakStatement(node)) {
    const label = node.getLabel();
    return { kind: 'BreakAsn', syntaxRole: 'statement', identifier: label ? { name: label.getText() } : null };
  }

  if (Node.isContinueStatement(node)) {
    const label = node.getLabel();
    return { kind: 'ContinueAsn', syntaxRole: 'statement', identifier: label ? { name: label.getText() } : null };
  }
  if (Node.isThrowStatement(node)) return tsRl.ast.statements.parseThrow(node,ctx);
  if (Node.isVariableStatement(node)) {
    const decls = node.getDeclarations();
    return decls.length > 0
      ? tsRl.ast.bindings.parseVariable(decls[0] as any,ctx)
      : ({
          kind: 'BlockAsn',
          syntaxRole: 'statement',
          statements: [],
        } as abstractions.translators.BlockAsn);
  }
  if (Node.isCallExpression(node)) {
    const expression = node.getExpression();

    const identifier = Node.isIdentifier(expression) ? { name: expression.getText() } : null;

    return {
      kind: 'CallAsn',
      syntaxRole: 'statement',
      identifier,
      arguments_: node.getArguments().map((arg) => parse(arg as any, ctx)),
    };
  }

  if (Node.isExpressionStatement(node)) {
    const expr = node.getExpression();
    return tsRl.ast.expressions.parse(expr, ctx);
  }
  throw new tsRl.ast.UnknownNodeException(node);
}
