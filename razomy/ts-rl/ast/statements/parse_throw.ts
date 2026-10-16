import { ThrowStatement } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as tsRl from '@razomy/ts-rl';
import * as random from "@razomy/random";

export function parseThrow(node: ThrowStatement, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.ThrowAsn {
  const throwAsn: abstractions.translators.ThrowAsn = {
    id: random.createUuid(),
    kind: 'ThrowAsn',
    syntaxRole: 'statement',
    value: null as any,
  };

  if (!ctx.enter(throwAsn, node)) {
    return throwAsn;
  }

  throwAsn.value = tsRl.ast.expressions.parse(node.getExpression()!, ctx) as abstractions.translators.StateAsnType;

  return ctx.leave(throwAsn, node);
}