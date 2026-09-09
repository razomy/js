import { NullLiteral } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';

export function parseNull(node: NullLiteral): abstracts.translators.BuildInExpression {
  return {
    kind: 'BuildInExpression',
    type: 'Null',
    value: null,
  };
}
