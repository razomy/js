import { ConditionalExpression } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRala from "@razomy/ts-rala";

export function parseCondition(
  node: ConditionalExpression
): abstracts.translators.IfConditionalFlowExpression {

  const branches: abstracts.translators.IfBranchFlowExpression[] = [];

  // 1. IF Branch (Then)
  branches.push({
    kind: 'IfBranchFlowExpression',
    pattern: tsRala.ast.expressions.parse(node.getCondition()),
    expression: tsRala.ast.expressions.parse(node.getWhenTrue()),
  });

  // 2. ELSE Branch (if exists)
  const elseNode = node.getWhenFalse();
  if (elseNode) {
    branches.push({
      kind: 'IfBranchFlowExpression',
      pattern: null, // Else branch has no pattern
      expression: tsRala.ast.expressions.parse(elseNode),
    });
  }

  return {
    kind: 'IfConditionalFlowExpression',
    branches,
  };
}
