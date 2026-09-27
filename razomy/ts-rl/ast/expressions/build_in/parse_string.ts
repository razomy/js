import { StringLiteral, NoSubstitutionTemplateLiteral } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";

export function parseString(node: StringLiteral | NoSubstitutionTemplateLiteral): abstracts.translators.LiteralAst {
  return { kind: 'LiteralAst', syntaxLayer: 'expression', semanticLayer: 'state', value: node.getLiteralValue() };
}
