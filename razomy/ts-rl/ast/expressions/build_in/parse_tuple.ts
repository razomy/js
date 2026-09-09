import { ArrayLiteralExpression } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from "@razomy/ts-rl";

export function parseTuple(node: ArrayLiteralExpression): abstracts.translators.ArrayExpression {
  return {
    kind: 'ArrayExpression',
    type: 'Tuple',
    expressions: node
      .getElements()
      .map((element) => tsRl.ast.expressions.parse(element) as any)
      .filter(Boolean),
  };
}
