import { ArrayLiteralExpression } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseArray(node: ArrayLiteralExpression, ctx: tsRl.ast.HasEnterLeaveProduce): abstracts.translators.ArrayAst {
  return {
    kind: 'ArrayAst',
    syntaxRole: 'expression',
    semanticLayer: 'state',
    values: node.getElements().map(i=>tsRl.ast.expressions.parse(i,ctx)).filter(Boolean) as abstracts.translators.AstType[],
  };
}
