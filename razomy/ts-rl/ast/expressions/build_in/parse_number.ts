import { NumericLiteral } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseNumber(node: NumericLiteral, ctx: tsRl.ast.HasEnterLeaveProduce): abstracts.translators.LiteralAsn {
  return { kind: 'LiteralAsn', syntaxRole: 'expression', semanticLayer: 'state', value: node.getLiteralValue() };
}
