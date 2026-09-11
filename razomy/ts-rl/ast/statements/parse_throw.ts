import { ThrowStatement } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseThrow(node: ThrowStatement): abstracts.translators.ThrowAst {
  return {
    kind: 'ThrowAst', syntaxLayer: 3,
    value: node.getExpression() ? tsRl.ast.expressions.parse(node.getExpression()!) as abstracts.translators.StateAstType : { kind: 'LiteralAst', syntaxLayer: 2, semanticLayer: 1, value: undefined },
  };
}
