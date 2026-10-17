import { BigIntLiteral } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as random from '@razomy/random';

export function parseBigInt(node: BigIntLiteral, ctx: abstractions.patterns.HasEnterLeave): abstractions.translators.LiteralAsn {
  const literalAsn: abstractions.translators.LiteralAsn = {
    id: random.createUuid(),
    kind: 'LiteralAsn',
    syntaxRole: 'expression',
    semanticLayer: 'state',
    value: node.getLiteralValue(),
  };

  if (!ctx.enter(literalAsn, node)) {
    return literalAsn;
  }

  return ctx.leave(literalAsn, node);
}
