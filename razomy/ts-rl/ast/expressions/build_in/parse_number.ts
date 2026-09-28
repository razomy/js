import { NumericLiteral } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";

export function parseNumber(node: NumericLiteral): abstracts.translators.LiteralAst {
  return { kind: 'LiteralAst', syntaxRole: 'expression', semanticLayer: 'state', value: node.getLiteralValue() };
}
