import { ArrayLiteralExpression } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as tsRl from '@razomy/ts-rl';
import * as random from '@razomy/random';

export function parseTuple(node: ArrayLiteralExpression, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.TupleAsn {
  const tupleAsn: abstractions.translators.TupleAsn = {
    id: random.createUuid(),
    kind: 'TupleAsn',
    syntaxRole: 'expression',
    semanticLayer: 'state',
    values: [],
  };

  if (!ctx.enter(tupleAsn, node)) {
    return tupleAsn;
  }

  tupleAsn.values = node.getElements().map((el) => tsRl.ast.expressions.parse(el, ctx));

  return ctx.leave(tupleAsn, node);
}