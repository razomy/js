import type { BooleanLiteral, TrueLiteral, FalseLiteral } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";

export function parseBoolean(node: BooleanLiteral | TrueLiteral | FalseLiteral): abstracts.translators.LiteralAst {
  return { kind: 'LiteralAst', syntaxRole: 'expression', semanticLayer: 'state', value: node.getLiteralValue() };
}
