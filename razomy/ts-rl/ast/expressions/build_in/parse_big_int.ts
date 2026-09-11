import { BigIntLiteral } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";

export function parseBigInt(node: BigIntLiteral): abstracts.translators.LiteralAst {
  const text = node.getLiteralText();
  return { kind: 'LiteralAst', syntaxLayer: 2, semanticLayer: 1, value: BigInt(text.endsWith('n') ? text.slice(0, -1) : text) };
}
