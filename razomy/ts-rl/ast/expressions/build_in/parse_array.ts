import { ArrayLiteralExpression } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseArray(node: ArrayLiteralExpression): abstracts.translators.ArrayAst {
  return {
    kind: 'ArrayAst',
    syntaxLayer: 2,
    semanticLayer: 1,
    values: node.getElements().map(tsRl.ast.expressions.parse).filter(Boolean) as abstracts.translators.AstType[],
  };
}
