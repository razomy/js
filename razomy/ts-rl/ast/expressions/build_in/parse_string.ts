import { StringLiteral, NoSubstitutionTemplateLiteral } from 'ts-morph';
import * as translators from '@razomy/abstracts/translators';

export function parseString(node: StringLiteral | NoSubstitutionTemplateLiteral): translators.LiteralAst {
  return { kind: 'LiteralAst', syntaxLayer: 2, semanticLayer: 1, value: node.getLiteralValue() };
}
