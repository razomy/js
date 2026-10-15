import { ArrayLiteralExpression } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";

export function parseTuple(node: ArrayLiteralExpression, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.TupleAsn {
  return {
    kind: 'TupleAsn',
    syntaxRole: 'expression',
    semanticLayer: 'state',
    values: node.getElements().map(i=>tsRl.ast.expressions.parse(i,ctx)).filter(Boolean) as abstractions.translators.AsnType[],
  };
}
