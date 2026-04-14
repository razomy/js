import type { BooleanLiteral, TrueLiteral, FalseLiteral } from "ts-morph";
import * as abstracts from "@razomy/abstracts";

export function parseBooleanExpression(node: BooleanLiteral | TrueLiteral | FalseLiteral): abstracts.translators.BuildInExpression {
  return {
    kind: 'BuildInExpression',
    type: 'Boolean',
    value: node.getLiteralValue(),
  };
}
