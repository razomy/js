import type { BooleanLiteral, TrueLiteral, FalseLiteral } from "ts-morph";
import * as abstracts from "@razomy/abstracts";

export function parseBooleanExpression(node: BooleanLiteral | TrueLiteral | FalseLiteral): abstracts.ast.BooleanExpression {
  return {
    kind: 'BooleanExpression',
    value: node.getLiteralValue(),
  };
}
