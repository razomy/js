import { RegularExpressionLiteral } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';

export function parseRegExp(node: RegularExpressionLiteral): abstracts.translators.BuildInExpression {
  const text = node.getLiteralText();
  return {
    kind: 'BuildInExpression',
    type: 'RegExp',
    value: text,
  };
}
