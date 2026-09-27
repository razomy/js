import { ArrayLiteralExpression } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseTuple(node: ArrayLiteralExpression): abstracts.translators.TupleAst {
  return {
    kind: 'TupleAst',
    syntaxLayer: 'expression',
    semanticLayer: 'state',
    values: node.getElements().map(tsRl.ast.expressions.parse).filter(Boolean) as abstracts.translators.AstType[],
  };
}
