import { ConditionalExpression } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from '@razomy/ts-rl';

export function parseCondition(node: ConditionalExpression): abstracts.translators.TernaryAst {
  return {
    kind: 'TernaryAst',
    syntaxLayer: 'expression',
    branches: [
      {
        kind: 'ConditionBranchAst',
        syntaxLayer: 'expression',
        pattern: tsRl.ast.expressions.parse(node.getCondition())!,
        value: tsRl.ast.expressions.parse(node.getWhenTrue())!,
      } as abstracts.translators.ConditionBranchAst,
      {
        kind: 'ElseBranchAst',
        syntaxLayer: 'expression',
        value: tsRl.ast.expressions.parse(node.getWhenFalse())!,
      } as abstracts.translators.ElseBranchAst,
    ],
  };
}
