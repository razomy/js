import { NullLiteral } from "ts-morph";
import * as abstracts from "@razomy/abstracts";

export function parseNullExpression(node: NullLiteral): abstracts.translators.NullExpression {
  return {
    kind: 'NullExpression',
    value: null,
  };
}
