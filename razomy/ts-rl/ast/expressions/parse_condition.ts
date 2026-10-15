import { ConditionalExpression } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as tsRl from '@razomy/ts-rl';

export function parseCondition(node: ConditionalExpression, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.TernaryAsn {
  return {
    kind: 'TernaryAsn',
    syntaxRole: 'expression',
    branches: [
      {
        kind: 'ConditionBranchAsn',
        syntaxRole: 'expression',
        pattern: tsRl.ast.expressions.parse(node.getCondition(), ctx)!,
        value: tsRl.ast.expressions.parse(node.getWhenTrue(), ctx)!,
      } as abstractions.translators.ConditionBranchAsn,
      {
        kind: 'ElseBranchAsn',
        syntaxRole: 'expression',
        value: tsRl.ast.expressions.parse(node.getWhenFalse(), ctx)!,
      } as abstractions.translators.ElseBranchAsn,
    ],
  };
}
