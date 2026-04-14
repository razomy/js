import { ArrayLiteralExpression } from "ts-morph";
import { parseExpression } from "../parse_expression";
import * as abstracts from "@razomy/abstracts";

export function parseTupleExpression(node: ArrayLiteralExpression): abstracts.translators.ArrayExpression {
  return {
    kind: 'ArrayExpression',
    type: 'Tuple',
    expressions: node.getElements().map(element => parseExpression(element) as any).filter(Boolean),
  };
}
