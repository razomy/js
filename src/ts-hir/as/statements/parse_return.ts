import { ReturnStatement } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as random from "@razomy/random";
import * as tsHir from "@razomy/ts-hir";

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

  returnAsn.value = node.getExpression() ? (tsHir.as.expressions.parse(node.getExpression()!, ctx) as abstractions.translator.StateAsnType) : null;

  return ctx.leave(returnAsn, node);
}
