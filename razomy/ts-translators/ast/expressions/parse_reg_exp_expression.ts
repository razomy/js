import { RegularExpressionLiteral } from "ts-morph";
import * as abstracts from "@razomy/abstracts";

export function parseRegExpExpression(node: RegularExpressionLiteral): abstracts.translators.RegExpExpression {
  const text = node.getLiteralText();
  const lastSlashIndex = text.lastIndexOf('/');
  const pattern = text.substring(1, lastSlashIndex);
  const flags = text.substring(lastSlashIndex + 1);
  return {
    kind: 'RegExpExpression',
    pattern,
    flags,
  };
}
