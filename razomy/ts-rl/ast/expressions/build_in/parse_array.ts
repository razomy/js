import { ArrayLiteralExpression } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";

export function parseArray(node: ArrayLiteralExpression, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.ArrayAsn {
  return {
    kind: 'ArrayAsn',
    syntaxRole: 'expression',
    semanticLayer: 'state',
    values: node.getElements().map(i=>tsRl.ast.expressions.parse(i,ctx)).filter(Boolean) as abstractions.translators.AsnType[],
  };
}
