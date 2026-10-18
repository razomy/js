import { ReturnStatement } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";
import * as random from "@razomy/random";

export function parseReturn(node: ReturnStatement, ctx: abstractions.patterns.HasEnterLeave): abstractions.translator.ReturnAsn {
  const returnAsn: abstractions.translator.ReturnAsn = {
    id: random.createUuid(),
    kind: 'ReturnAsn',
    syntaxRole: 'statement',
    value: null,
  };

  if (!ctx.enter(returnAsn, node)) {
    return returnAsn;
  }

  returnAsn.value = node.getExpression() ? (tsRl.as.expressions.parse(node.getExpression()!, ctx) as abstractions.translator.StateAsnType) : null;

  return ctx.leave(returnAsn, node);
}
