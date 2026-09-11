import { ReturnStatement } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseReturn(node: ReturnStatement): abstracts.translators.ReturnAst {
  return {
    kind: 'ReturnAst', syntaxLayer: 3,
    value: node.getExpression() ? tsRl.ast.expressions.parse(node.getExpression()!) as abstracts.translators.StateAstType : null,
  };
}
