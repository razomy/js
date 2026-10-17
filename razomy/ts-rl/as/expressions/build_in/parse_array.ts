import { ArrayLiteralExpression } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as tsRl from '@razomy/ts-rl';
import * as random from '@razomy/random';

export function parseArray(node: ArrayLiteralExpression, ctx: abstractions.patterns.HasEnterLeave): abstractions.translators.ArrayAsn {
  const arrayAsn: abstractions.translators.ArrayAsn = {
    id: random.createUuid(),
    kind: 'ArrayAsn',
    syntaxRole: 'expression',
    semanticLayer: 'state',
    values: [],
  };

  if (!ctx.enter(arrayAsn, node)) {
    return arrayAsn;
  }

  arrayAsn.values = node.getElements().map((el) => tsRl.as.expressions.parse(el, ctx));

  return ctx.leave(arrayAsn, node);
}
