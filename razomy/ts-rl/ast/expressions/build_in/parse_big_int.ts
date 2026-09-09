import { BigIntLiteral } from 'ts-morph';
import * as translators from '@razomy/abstracts/translators';

export function parseBigInt(node: BigIntLiteral): translators.LiteralAst {
  const text = node.getLiteralText();
  return { kind: 'LiteralAst', syntaxLayer: 2, semanticLayer: 1, value: BigInt(text.endsWith('n') ? text.slice(0, -1) : text) };
}
