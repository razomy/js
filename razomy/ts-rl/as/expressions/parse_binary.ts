import { BinaryExpression } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";
import * as random from "@razomy/random";

export function parseBinary(node: BinaryExpression, ctx: abstractions.patterns.HasEnterLeave): abstractions.translators.BinaryAsn {
  const binaryAsn: abstractions.translators.BinaryAsn = {
    id: random.createUuid(),
    kind: 'BinaryAsn',
    syntaxRole: 'expression',
    operator: node.getOperatorToken().getText() as abstractions.translators.BinaryAsn['operator'],
    left: null as any,
    right: null as any,
  };

  if (!ctx.enter(binaryAsn, node)) {
    return binaryAsn;
  }

  binaryAsn.left = tsRl.as.expressions.parse(node.getLeft(), ctx)!;
  binaryAsn.right = tsRl.as.expressions.parse(node.getRight(), ctx)!;

  return ctx.leave(binaryAsn, node);
}
