import { NumericLiteral } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';

export function parseNumber(node: NumericLiteral): abstracts.translators.BuildInExpression {
  return {
    kind: 'BuildInExpression',
    type: 'Number',
    value: node.getLiteralValue(),
  };
}
