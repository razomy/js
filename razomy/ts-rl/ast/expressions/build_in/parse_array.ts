import { ArrayLiteralExpression } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from "@razomy/ts-rl";

export function parseArray(node: ArrayLiteralExpression): abstracts.translators.ArrayAst {
  return {
    kind: 'ArrayAst',
    semanticLayer: 1,
    syntaxLayer: 1,
    elements: node
      .getElements()
      .map((element) => tsRl.ast.expressions.parse(element))
      .filter((i) => i != null),
  };
}
