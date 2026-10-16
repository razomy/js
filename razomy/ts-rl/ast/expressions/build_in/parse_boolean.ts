import { type BooleanLiteral, Node } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as tsRl from '@razomy/ts-rl';
import * as random from '@razomy/random';

export function parseBoolean(node: BooleanLiteral | Node, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.LiteralAsn {
  const literalAsn: abstractions.translators.LiteralAsn = {
    id: random.createUuid(),
    kind: 'LiteralAsn',
    syntaxRole: 'expression',
    semanticLayer: 'state',
    value: (node as any).getLiteralValue ? (node as any).getLiteralValue() : node.getText() === 'true',
  };

  if (!ctx.enter(literalAsn, node)) {
    return literalAsn;
  }

  return ctx.leave(literalAsn, node);
}
