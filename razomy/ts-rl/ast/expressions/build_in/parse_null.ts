import { NullLiteral } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";

export function parseNull(node: NullLiteral): abstracts.translators.LiteralAst {
  return { kind: 'LiteralAst', syntaxRole: 'expression', semanticLayer: 'state', value: null };
}
