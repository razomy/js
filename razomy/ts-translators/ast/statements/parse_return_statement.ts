import { ReturnStatement } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsTranslators from '@razomy/ts-translators';

export function parseReturnStatement(node: ReturnStatement): abstracts.translators.ReturnStatement {
  const expressionNode = node.getExpression();

  return {
    kind: 'ReturnStatement',
    argument: expressionNode
      ? tsTranslators.ast.expressions.parseExpression(expressionNode)
      : null, // Если это просто `return;`
  };
}

