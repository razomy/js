import { ArrayLiteralExpression } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsTranslators from '@razomy/ts-translators';

export function parseTupleExpression(node: ArrayLiteralExpression): abstracts.translators.ArrayExpression {
  return {
    kind: 'ArrayExpression',
    type: 'Tuple',
    expressions: node
      .getElements()
      .map((element) => tsTranslators.ast.expressions.parseExpression(element) as any)
      .filter(Boolean),
  };
}
