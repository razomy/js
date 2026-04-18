import { Node, Statement } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRala from "@razomy/ts-rala";

export function parseLoop(
  node: Statement
):
  | abstracts.translators.DoWhileLoopFlowStatement
  | abstracts.translators.WhileDoLoopFlowStatement
  | abstracts.translators.ForInLoopFlowStatement
  | abstracts.translators.ForOfLoopFlowStatement
  | abstracts.translators.ForItLoopFlowStatement
{
  if (Node.isForStatement(node)) {
    let init: abstracts.translators.ExpressionType | null = null;
    let condition: abstracts.translators.ExpressionType | null = null;
    let update: abstracts.translators.ExpressionType | null = null;

    const initNode = node.getInitializer();
    if (initNode) init = tsRala.ast.expressions.parse(initNode);

    const condNode = node.getCondition();
    if (condNode) condition = tsRala.ast.expressions.parse(condNode);

    const updNode = node.getIncrementor();
    if (updNode) update = tsRala.ast.expressions.parse(updNode);

    return {
      kind: 'ForItLoopFlowStatement',
      init,
      condition,
      update,
      block: tsRala.ast.statements.parseBlock(node.getStatement()),
    };
  }

  if (Node.isWhileStatement(node)) {
    return {
      kind: 'WhileDoLoopFlowStatement',
      condition: tsRala.ast.expressions.parse(node.getExpression()),
      block: tsRala.ast.statements.parseBlock(node.getStatement()),
    };
  }

  if (Node.isDoStatement(node)) {
    return {
      kind: 'DoWhileLoopFlowStatement',
      condition: tsRala.ast.expressions.parse(node.getExpression()),
      block: tsRala.ast.statements.parseBlock(node.getStatement()),
    };
  }

  if (Node.isForOfStatement(node)) {
    return {
      kind: 'ForOfLoopFlowStatement',
      init: tsRala.ast.expressions.parse(node.getExpression()),
      block: tsRala.ast.statements.parseBlock(node.getStatement()),
    };
  }

  if (Node.isForInStatement(node)) {
    return {
      kind: 'ForInLoopFlowStatement',
      init: tsRala.ast.expressions.parse(node.getExpression()),
      block: tsRala.ast.statements.parseBlock(node.getStatement()),
    };
  }

  throw new Error('Unsupported loop node type');
}

