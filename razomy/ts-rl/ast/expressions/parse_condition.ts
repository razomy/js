import { ConditionalExpression } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from "@razomy/ts-rl";

export function parseCondition(
  node: ConditionalExpression
): abstracts.translators.IfConditionalFlowExpression {

  const branches: abstracts.translators.IfBranchFlowExpression[] = [];

  // 1. IF Branch (Then)
  branches.push({
    kind: 'IfBranchFlowExpression',
    pattern: tsRl.ast.expressions.parse(node.getCondition()),
    expression: tsRl.ast.expressions.parse(node.getWhenTrue()),
  });

  // 2. ELSE Branch (if exists)
  const elseNode = node.getWhenFalse();
  if (elseNode) {
    branches.push({
      kind: 'IfBranchFlowExpression',
      pattern: null, // Else branch has no pattern
      expression: tsRl.ast.expressions.parse(elseNode),
    });
  }

  return {
    kind: 'IfConditionalFlowExpression',
    branches,
  };
}
