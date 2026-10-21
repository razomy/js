import { ConditionalExpression } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as random from '@razomy/random';
import * as tsHir from "@razomy/ts-hir";

export function parseCondition(node: ConditionalExpression, ctx: abstractions.patterns.HasEnterLeave): abstractions.translator.TernaryAsn {
  const ternaryAsn: abstractions.translator.TernaryAsn = {
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
      pattern: tsHir.as.expressions.parse(node.getCondition(), ctx)!,
      value: tsHir.as.expressions.parse(node.getWhenTrue(), ctx)!,
    } as abstractions.translator.ConditionBranchAsn,
    {
      id: random.createUuid(),
      kind: 'ElseBranchAsn',
      syntaxRole: 'expression',
      value: tsHir.as.expressions.parse(node.getWhenFalse(), ctx)!,
    } as abstractions.translator.ElseBranchAsn,
  ];

  return ctx.leave(ternaryAsn, node);
}
