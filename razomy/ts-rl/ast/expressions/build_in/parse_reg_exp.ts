import { RegularExpressionLiteral } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";

export function parseRegExp(node: RegularExpressionLiteral): abstracts.translators.LiteralAst {
  return { kind: 'LiteralAst', syntaxLayer: 2, semanticLayer: 1, value: node.getLiteralText() };
}
