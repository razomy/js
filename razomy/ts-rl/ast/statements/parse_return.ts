import { ReturnStatement } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from "@razomy/ts-rl";

export function parseReturn(node: ReturnStatement): abstracts.translators.ReturnAst {
  const expressionNode = node.getExpression();

  return {
    kind: 'ReturnAst',
    syntaxLayer:1,
    value: expressionNode
      ? tsRl.ast.expressions.parse(expressionNode)
      : null, // Если это просто `return;`
  };
}

