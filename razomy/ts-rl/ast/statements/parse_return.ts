import { ReturnStatement } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseReturn(node: ReturnStatement, ctx: tsRl.ast.HasEnterLeaveProduce): abstracts.translators.ReturnAsn {
  return {
    kind: 'ReturnAsn', syntaxRole: 'statement',
    value: node.getExpression() ? tsRl.ast.expressions.parse(node.getExpression()!, ctx) as abstracts.translators.StateAsnType : null,
  };
}
