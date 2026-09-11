import { NumericLiteral } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";

export function parseNumber(node: NumericLiteral): abstracts.translators.LiteralAst {
  return { kind: 'LiteralAst', syntaxLayer: 2, semanticLayer: 1, value: node.getLiteralValue() };
}
