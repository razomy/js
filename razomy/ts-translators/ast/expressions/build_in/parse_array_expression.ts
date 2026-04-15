import {ArrayLiteralExpression} from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import * as tsTranslators from "@razomy/ts-translators";

export function parseArrayExpression(node: ArrayLiteralExpression): abstracts.translators.ArrayExpression {
  return {
    kind: 'ArrayExpression',
    type: 'Array',
    expressions: node.getElements().map(element => tsTranslators.ast.expressions.parseExpression(element))
      .filter(i => i != null),
  };
}
