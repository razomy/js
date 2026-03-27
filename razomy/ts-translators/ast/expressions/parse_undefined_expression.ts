import { Identifier } from "ts-morph";
import * as abstracts from "@razomy/abstracts";

export function parseUndefinedExpression(node: Identifier): abstracts.translators.UndefinedExpression {
  return {
    kind: 'UndefinedExpression',
    value: undefined,
  };
}
