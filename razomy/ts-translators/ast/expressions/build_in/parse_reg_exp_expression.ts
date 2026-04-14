import { RegularExpressionLiteral } from "ts-morph";
import * as abstracts from "@razomy/abstracts";

export function parseRegExpExpression(node: RegularExpressionLiteral): abstracts.translators.BuildInExpression {
  const text = node.getLiteralText();
  return {
    kind: 'BuildInExpression',
    type: 'RegExp',
    value:text,
  };
}
