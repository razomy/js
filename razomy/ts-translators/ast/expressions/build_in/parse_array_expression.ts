import {ArrayLiteralExpression} from "ts-morph";
import {parseExpression} from "../parse_expression";
import * as abstracts from "@razomy/abstracts";

export function parseArrayExpression(node: ArrayLiteralExpression): abstracts.translators.ArrayExpression {
  return {
    kind: 'ArrayExpression',
    type: 'Array',
    expressions: node.getElements().map(element => parseExpression(element))
      .filter(i => i != null),
  };
}
