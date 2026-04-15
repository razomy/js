import { StringLiteral, NoSubstitutionTemplateLiteral } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';

export function parseStringExpression(
  node: StringLiteral | NoSubstitutionTemplateLiteral,
): abstracts.translators.BuildInExpression {
  return {
    kind: 'BuildInExpression',
    type: 'String',
    value: node.getLiteralValue(),
  };
}
