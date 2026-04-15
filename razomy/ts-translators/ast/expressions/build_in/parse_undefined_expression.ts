import { Identifier } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';

export function parseUndefinedExpression(node: Identifier): abstracts.translators.BuildInExpression {
  return {
    kind: 'BuildInExpression',
    type: 'Undefined',
    value: undefined,
  };
}
