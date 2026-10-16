import { ConditionalExpression } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as tsRl from '@razomy/ts-rl';
import * as random from '@razomy/random';

export function parseCondition(node: ConditionalExpression, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.TernaryAsn {
  const ternaryAsn: abstractions.translators.TernaryAsn = {
    id: random.createUuid(),
    kind: 'TernaryAsn',
    syntaxRole: 'expression',
    branches: [],
  };

  if (!ctx.enter(ternaryAsn, node)) {
    return ternaryAsn;
  }

  ternaryAsn.branches = [
    {
      id: random.createUuid(),
      kind: 'ConditionBranchAsn',
      syntaxRole: 'expression',
      pattern: tsRl.ast.expressions.parse(node.getCondition(), ctx)!,
      value: tsRl.ast.expressions.parse(node.getWhenTrue(), ctx)!,
    } as abstractions.translators.ConditionBranchAsn,
    {
      id: random.createUuid(),
      kind: 'ElseBranchAsn',
      syntaxRole: 'expression',
      value: tsRl.ast.expressions.parse(node.getWhenFalse(), ctx)!,
    } as abstractions.translators.ElseBranchAsn,
  ];

  return ctx.leave(ternaryAsn, node);
}