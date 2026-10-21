import { ThrowStatement } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as random from "@razomy/random";
import * as tsHir from "@razomy/ts-hir";

export function parseThrow(node: ThrowStatement, ctx: abstractions.patterns.HasEnterLeave): abstractions.translator.ThrowAsn {
  const throwAsn: abstractions.translator.ThrowAsn = {
    id: random.createUuid(),
    kind: 'ThrowAsn',
    syntaxRole: 'statement',
    value: null as any,
  };

  if (!ctx.enter(throwAsn, node)) {
    return throwAsn;
  }

  throwAsn.value = tsHir.as.expressions.parse(node.getExpression()!, ctx) as abstractions.translator.StateAsnType;

  return ctx.leave(throwAsn, node);
}
