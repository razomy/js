import { BigIntLiteral } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as tsRl from "@razomy/ts-rl";

export function parseBigInt(node: BigIntLiteral, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.LiteralAsn {
  const text = node.getLiteralText();
  return {
    kind: 'LiteralAsn',
    syntaxRole: 'expression',
    semanticLayer: 'state',
    value: BigInt(text.endsWith('n') ? text.slice(0, -1) : text),
  };
}
