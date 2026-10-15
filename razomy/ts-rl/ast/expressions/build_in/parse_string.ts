import { StringLiteral, NoSubstitutionTemplateLiteral } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";

export function parseString(node: StringLiteral | NoSubstitutionTemplateLiteral, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.LiteralAsn {
  return { kind: 'LiteralAsn', syntaxRole: 'expression', semanticLayer: 'state', value: node.getLiteralValue() };
}
