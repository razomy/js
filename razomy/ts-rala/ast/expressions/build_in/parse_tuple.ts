import { ArrayLiteralExpression } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsLang from '../../..';

export function parseTuple(node: ArrayLiteralExpression): abstracts.translators.ArrayExpression {
  return {
    kind: 'ArrayExpression',
    type: 'Tuple',
    expressions: node
      .getElements()
      .map((element) => tsLang.ast.expressions.parse(element) as any)
      .filter(Boolean),
  };
}
