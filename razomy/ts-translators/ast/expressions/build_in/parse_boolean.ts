import type { BooleanLiteral, TrueLiteral, FalseLiteral } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';

export function parseBoolean(
  node: BooleanLiteral | TrueLiteral | FalseLiteral,
): abstracts.translators.BuildInExpression {
  return {
    kind: 'BuildInExpression',
    type: 'Boolean',
    value: node.getLiteralValue(),
  };
}
