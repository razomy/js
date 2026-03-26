import { BigIntLiteral } from "ts-morph";
import * as abstracts from "@razomy/abstracts";

export function parseBigIntExpression(node: BigIntLiteral): abstracts.ast.BigIntExpression {
  const text = node.getLiteralText();
  const value = text.endsWith('n') ? text.slice(0, -1) : text;
  return {
    kind: 'BigIntExpression',
    value: BigInt(value),
  };
}
