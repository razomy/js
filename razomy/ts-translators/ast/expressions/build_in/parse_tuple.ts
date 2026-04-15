import { ArrayLiteralExpression } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsTranslators from '@razomy/ts-translators';

export function parseTuple(node: ArrayLiteralExpression): abstracts.translators.ArrayExpression {
  return {
    kind: 'ArrayExpression',
    type: 'Tuple',
    expressions: node
      .getElements()
      .map((element) => tsTranslators.ast.expressions.parse(element) as any)
      .filter(Boolean),
  };
}
