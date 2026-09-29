import { ConditionalExpression } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from '@razomy/ts-rl';

export function parseCondition(node: ConditionalExpression, ctx: tsRl.ast.HasEnterLeaveProduce): abstracts.translators.TernaryAst {
  return {
    kind: 'TernaryAst',
    syntaxRole: 'expression',
    branches: [
      {
        kind: 'ConditionBranchAst',
        syntaxRole: 'expression',
        pattern: tsRl.ast.expressions.parse(node.getCondition(), ctx)!,
        value: tsRl.ast.expressions.parse(node.getWhenTrue(), ctx)!,
      } as abstracts.translators.ConditionBranchAst,
      {
        kind: 'ElseBranchAst',
        syntaxRole: 'expression',
        value: tsRl.ast.expressions.parse(node.getWhenFalse(), ctx)!,
      } as abstracts.translators.ElseBranchAst,
    ],
  };
}
