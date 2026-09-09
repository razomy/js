import { NullLiteral } from 'ts-morph';
import * as translators from '@razomy/abstracts/translators';

export function parseNull(node: NullLiteral): translators.LiteralAst {
  return { kind: 'LiteralAst', syntaxLayer: 2, semanticLayer: 1, value: null };
}
