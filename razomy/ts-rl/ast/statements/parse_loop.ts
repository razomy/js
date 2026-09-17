import { Node, Statement } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseLoop(node: Statement): abstracts.translators.FlowAstType {
  if (Node.isForStatement(node)) {
    return {
      kind: 'ForItAst', syntaxLayer: 3,
      init: node.getInitializer() ? tsRl.ast.bindings.parse(node.getInitializer()!) : null,
      condition: node.getCondition() ? tsRl.ast.expressions.parse(node.getCondition()!) : null,
      update: node.getIncrementor() ? tsRl.ast.expressions.parse(node.getIncrementor()!) : null,
      block: tsRl.ast.statements.parseBlock(node.getStatement()),
    } as abstracts.translators.ForItAst;
  }
  if (Node.isWhileStatement(node)) {
    return { kind: 'WhileDoAst', syntaxLayer: 3, condition: tsRl.ast.expressions.parse(node.getExpression()), block: tsRl.ast.statements.parseBlock(node.getStatement()) } as abstracts.translators.WhileDoAst;
  }
  if (Node.isDoStatement(node)) {
    return { kind: 'DoWhileAst', syntaxLayer: 3, condition: tsRl.ast.expressions.parse(node.getExpression()), block: tsRl.ast.statements.parseBlock(node.getStatement()) } as abstracts.translators.DoWhileAst;
  }
  if (Node.isForOfStatement(node)) {
    return { kind: 'ForOfAst', syntaxLayer: 3, init: tsRl.ast.expressions.parse(node.getExpression()), block: tsRl.ast.statements.parseBlock(node.getStatement()) } as abstracts.translators.ForOfAst;
  }
  if (Node.isForInStatement(node)) {
    return { kind: 'ForInAst', syntaxLayer: 3, init: null, condition: null, update: null, block: tsRl.ast.statements.parseBlock(node.getStatement()) } as abstracts.translators.ForIAst;
  }
  throw new Error('Unsupported loop node type');
}
