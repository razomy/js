import { NumericLiteral } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as tsRl from '@razomy/ts-rl';
import * as random from '@razomy/random';

export function parseNumber(node: NumericLiteral, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.LiteralAsn {
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