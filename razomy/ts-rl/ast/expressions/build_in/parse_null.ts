import { NullLiteral } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";

export function parseNull(node: NullLiteral, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.LiteralAsn {
  return { kind: 'LiteralAsn', syntaxRole: 'expression', semanticLayer: 'state', value: null };
}
