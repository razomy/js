import { Node, Statement } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsLang from '../..';

export function parseLoop(node: Statement): abstracts.translators.LoopFlowStatement {
  let type: 'do_while' | 'while_do' | 'for_in' | 'for_of' = 'while_do';
  let init: abstracts.translators.ExpressionType | null = null;
  let condition: abstracts.translators.ExpressionType | null = null;
  let update: abstracts.translators.ExpressionType | null = null;
  let bodyNode: Statement;

  if (Node.isForStatement(node)) {
    type = 'while_do'; // Классический for (;;) работает как while
    bodyNode = node.getStatement();

    // Парсим condition и update
    const condNode = node.getCondition();
    if (condNode) condition = tsLang.ast.expressions.parse(condNode);

    const updNode = node.getIncrementor();
    if (updNode) update = tsLang.ast.expressions.parse(updNode);

  } else if (Node.isWhileStatement(node)) {
    type = 'while_do';
    bodyNode = node.getStatement();
    condition = tsLang.ast.expressions.parse(node.getExpression());

  } else if (Node.isDoStatement(node)) {
    type = 'do_while';
    bodyNode = node.getStatement();
    condition = tsLang.ast.expressions.parse(node.getExpression());

  } else if (Node.isForOfStatement(node) || Node.isForInStatement(node)) {
    type = Node.isForOfStatement(node) ? 'for_of' : 'for_in';
    bodyNode = node.getStatement();
    condition = tsLang.ast.expressions.parse(node.getExpression());
  } else {
    throw new Error('Unsupported loop node type');
  }

  return {
    kind: 'LoopFlowStatement',
    type,
    init,
    condition,
    update,
    block: tsLang.ast.statements.parseBlock(bodyNode),
  };
}
