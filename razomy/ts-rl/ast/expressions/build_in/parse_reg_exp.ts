import { RegularExpressionLiteral } from 'ts-morph';
import * as translators from '@razomy/abstracts/translators';

export function parseRegExp(node: RegularExpressionLiteral): translators.LiteralAst {
  return { kind: 'LiteralAst', syntaxLayer: 2, semanticLayer: 1, value: node.getLiteralText() };
}
