import { RegularExpressionLiteral } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseRegExp(node: RegularExpressionLiteral, ctx: tsRl.ast.HasEnterLeaveProduce): abstracts.translators.LiteralAst {
  return { kind: 'LiteralAst', syntaxRole: 'expression', semanticLayer: 'state', value: node.getLiteralText() };
}
