import { ReturnStatement } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";
import * as random from "@razomy/random";

export function parseReturn(node: ReturnStatement, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.ReturnAsn {
  const returnAsn: abstractions.translators.ReturnAsn = {
    id: random.createUuid(),
    kind: 'ReturnAsn',
    syntaxRole: 'statement',
    value: null,
  };

  if (!ctx.enter(returnAsn, node)) {
    return returnAsn;
  }

  returnAsn.value = node.getExpression() ? (tsRl.ast.expressions.parse(node.getExpression()!, ctx) as abstractions.translators.StateAsnType) : null;

  return ctx.leave(returnAsn, node);
}