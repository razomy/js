import { ThrowStatement } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from '@razomy/ts-rl';

export function parseThrow(node: ThrowStatement): abstracts.translators.ThrowAst {
  return {
    kind: 'ThrowAst',
    syntaxRole: 'statement',
    value: tsRl.ast.expressions.parse(node.getExpression()!) as abstracts.translators.StateAstType,
  };
}
