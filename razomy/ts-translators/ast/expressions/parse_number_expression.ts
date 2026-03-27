import { NumericLiteral } from "ts-morph";
import * as abstracts from "@razomy/abstracts";

export function parseNumberExpression(node: NumericLiteral): abstracts.translators.NumberExpression {
  return {
    kind: 'NumberExpression',
    value: node.getLiteralValue(),
  };
}
