import { Node } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as random from '@razomy/random';

export function parseUndefined(node: Node, ctx: abstractions.patterns.HasEnterLeave): abstractions.translator.LiteralAsn {
  const literalAsn: abstractions.translator.LiteralAsn = {
    id: random.createUuid(),
    kind: 'LiteralAsn',
    syntaxRole: 'expression',
    semanticLayer: 'state',
    value: undefined,
  };

  if (!ctx.enter(literalAsn, node)) {
    return literalAsn;
  }

  return ctx.leave(literalAsn, node);
}
