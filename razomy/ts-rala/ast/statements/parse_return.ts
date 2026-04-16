import { ReturnStatement } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRala from "@razomy/ts-rala";

export function parseReturn(node: ReturnStatement): abstracts.translators.ReturnStatement {
  const expressionNode = node.getExpression();

  return {
    kind: 'ReturnStatement',
    argument: expressionNode
      ? tsRala.ast.expressions.parse(expressionNode)
      : null, // Если это просто `return;`
  };
}

