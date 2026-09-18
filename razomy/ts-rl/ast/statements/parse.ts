import { Node, Statement } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from '@razomy/ts-rl';

export function parse(node: Statement): abstracts.translators.AstType {
  if (Node.isBlock(node)) {
    return { kind: 'BlockAst', syntaxLayer: 3, statements: tsRl.ast.declarations.parseModuleBody(node) };
  }
  if (Node.isIfStatement(node)) return tsRl.ast.statements.parseCondition(node);
  if (Node.isSwitchStatement(node)) return tsRl.ast.statements.parseSwitch(node);
  if (Node.isTryStatement(node))
    return {
      kind: 'TryAst',
      syntaxLayer: 3,
      block: tsRl.ast.statements.parse(node.getTryBlock()),
    } as abstracts.translators.TryAst; // Basic Try mapping
  if (Node.isForStatement(node)) {
    return {
      kind: 'ForItAst',
      syntaxLayer: 3,
      init: node.getInitializer() ? tsRl.ast.parse(node.getInitializer()!) : null,
      condition: node.getCondition() ? tsRl.ast.expressions.parse(node.getCondition()!) : null,
      update: node.getIncrementor() ? tsRl.ast.expressions.parse(node.getIncrementor()!) : null,
      block: tsRl.ast.statements.parse(node.getStatement()),
    } as abstracts.translators.ForItAst;
  }
  if (Node.isWhileStatement(node)) {
    return {
      kind: 'WhileDoAst',
      syntaxLayer: 3,
      condition: tsRl.ast.expressions.parse(node.getExpression()),
      block: tsRl.ast.statements.parse(node.getStatement()),
    } as abstracts.translators.WhileDoAst;
  }
  if (Node.isDoStatement(node)) {
    return {
      kind: 'DoWhileAst',
      syntaxLayer: 3,
      condition: tsRl.ast.expressions.parse(node.getExpression()),
      block: tsRl.ast.statements.parse(node.getStatement()),
    } as abstracts.translators.DoWhileAst;
  }
  if (Node.isForOfStatement(node)) {
    return {
      kind: 'ForOfAst',
      syntaxLayer: 3,
      init: tsRl.ast.expressions.parse(node.getExpression()),
      block: tsRl.ast.statements.parse(node.getStatement()),
    } as abstracts.translators.ForOfAst;
  }
  if (Node.isForInStatement(node)) {
    return {
      kind: 'ForInAst',
      syntaxLayer: 3,
      init: null,
      condition: null,
      update: null,
      block: tsRl.ast.statements.parse(node.getStatement()),
    } as abstracts.translators.ForIAst;
  }
  if (Node.isReturnStatement(node)) return tsRl.ast.statements.parseReturn(node);
  if (Node.isBreakStatement(node)) {
    const label = node.getLabel();
    return { kind: 'BreakAst', syntaxLayer: 3, identifier: label ? { name: label.getText() } : null };
  }

  if (Node.isContinueStatement(node)) {
    const label = node.getLabel();
    return { kind: 'ContinueAst', syntaxLayer: 3, identifier: label ? { name: label.getText() } : null };
  }
  if (Node.isThrowStatement(node)) return tsRl.ast.statements.parseThrow(node);
  if (Node.isVariableStatement(node)) {
    const decls = node.getDeclarations();
    return decls.length > 0
      ? tsRl.ast.bindings.parseVariable(decls[0] as any)
      : ({
          kind: 'BlockAst',
          syntaxLayer: 3,
          statements: [],
        } as abstracts.translators.BlockAst);
  }
  if (Node.isCallExpression(node)) {
    const expression = node.getExpression();

    const identifier = Node.isIdentifier(expression) ? { name: expression.getText() } : null;

    return {
      kind: 'CallAst',
      syntaxLayer: 3,
      identifier,
      arguments_: node.getArguments().map((arg) => parse(arg as any)),
    };
  }

  if (Node.isExpressionStatement(node)) {
    const expr = node.getExpression();
    return tsRl.ast.expressions.parse(expr);
  }
  throw new tsRl.ast.UnknownNodeException(node);
}
