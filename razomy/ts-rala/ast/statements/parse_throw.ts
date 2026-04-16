import { ThrowStatement } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRala from "@razomy/ts-rala";

export function parseThrow(node: ThrowStatement): abstracts.translators.ThrowStatement {
  const expressionNode = node.getExpression();

  return {
    kind: 'ThrowStatement',
    argument: expressionNode
      ? tsRala.ast.expressions.parse(expressionNode)
      // fallback, если почему-то нет выражения (хотя в TS throw требует аргумент)
      : { kind: 'BuildInExpression', type: 'Undefined', value: undefined } as any,
  };
}
