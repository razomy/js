import type { BooleanLiteral, TrueLiteral, FalseLiteral } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";

export function parseBoolean(node: BooleanLiteral | TrueLiteral | FalseLiteral, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.LiteralAsn {
  return { kind: 'LiteralAsn', syntaxRole: 'expression', semanticLayer: 'state', value: node.getLiteralValue() };
}
