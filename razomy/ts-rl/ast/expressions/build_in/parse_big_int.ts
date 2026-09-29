import { BigIntLiteral } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from "@razomy/ts-rl";

export function parseBigInt(node: BigIntLiteral, ctx: tsRl.ast.HasEnterLeaveProduce): abstracts.translators.LiteralAst {
  const text = node.getLiteralText();
  return {
    kind: 'LiteralAst',
    syntaxRole: 'expression',
    semanticLayer: 'state',
    value: BigInt(text.endsWith('n') ? text.slice(0, -1) : text),
  };
}
