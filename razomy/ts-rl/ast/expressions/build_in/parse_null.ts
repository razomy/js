import { NullLiteral } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";

export function parseNull(node: NullLiteral): abstracts.translators.LiteralAst {
  return { kind: 'LiteralAst', syntaxLayer: 2, semanticLayer: 1, value: null };
}
