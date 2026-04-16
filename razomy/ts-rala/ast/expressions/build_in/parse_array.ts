import { ArrayLiteralExpression } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsLang from '../../..';

export function parseArray(node: ArrayLiteralExpression): abstracts.translators.ArrayExpression {
  return {
    kind: 'ArrayExpression',
    type: 'Array',
    expressions: node
      .getElements()
      .map((element) => tsLang.ast.expressions.parse(element))
      .filter((i) => i != null),
  };
}
