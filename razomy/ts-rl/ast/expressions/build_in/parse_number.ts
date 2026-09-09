import { NumericLiteral } from 'ts-morph';
import * as translators from '@razomy/abstracts/translators';

export function parseNumber(node: NumericLiteral): translators.LiteralAst {
  return { kind: 'LiteralAst', syntaxLayer: 2, semanticLayer: 1, value: node.getLiteralValue() };
}
