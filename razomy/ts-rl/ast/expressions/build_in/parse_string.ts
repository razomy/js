import { StringLiteral, NoSubstitutionTemplateLiteral } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseString(node: StringLiteral | NoSubstitutionTemplateLiteral, ctx: tsRl.ast.HasEnterLeaveProduce): abstracts.translators.LiteralAsn {
  return { kind: 'LiteralAsn', syntaxRole: 'expression', semanticLayer: 'state', value: node.getLiteralValue() };
}
