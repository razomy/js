import { RegularExpressionLiteral } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";

export function parseRegExp(node: RegularExpressionLiteral): abstracts.translators.LiteralAst {
  return { kind: 'LiteralAst', syntaxRole: 'expression', semanticLayer: 'state', value: node.getLiteralText() };
}
