import { ReturnStatement } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";

export function parseReturn(node: ReturnStatement, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.ReturnAsn {
  return {
    kind: 'ReturnAsn', syntaxRole: 'statement',
    value: node.getExpression() ? tsRl.ast.expressions.parse(node.getExpression()!, ctx) as abstractions.translators.StateAsnType : null,
  };
}
