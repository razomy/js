import { Identifier } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";

export function parseUndefined(node: Identifier): abstracts.translators.LiteralAst {
  return { kind: 'LiteralAst', syntaxLayer: 'expression', semanticLayer: 'state', value: undefined };
}
