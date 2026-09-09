import { Identifier } from 'ts-morph';
import * as translators from '@razomy/abstracts/translators';

export function parseUndefined(node: Identifier): translators.LiteralAst {
  return { kind: 'LiteralAst', syntaxLayer: 2, semanticLayer: 1, value: undefined };
}
