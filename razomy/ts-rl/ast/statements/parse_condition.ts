import { IfStatement } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from "@razomy/ts-rl";

export function parseCondition(
  node: IfStatement
): abstracts.translators.IfConditionalFlowStatement {

  const branches: abstracts.translators.IfBranchFlowStatement[] = [];

  // 1. IF Branch (Then)
  branches.push({
    kind: 'IfBranchFlowStatement',
    pattern: tsRl.ast.expressions.parse(node.getExpression()),
    block: tsRl.ast.statements.parseBlock(node.getThenStatement()),
  });

  // 2. ELSE Branch (if exists)
  const elseNode = node.getElseStatement();
  if (elseNode) {
    branches.push({
      kind: 'IfBranchFlowStatement',
      pattern: null, // Else branch has no pattern
      block: tsRl.ast.statements.parseBlock(elseNode),
    });
  }

  return {
    kind: 'IfConditionalFlowStatement',
    branches,
  };
}
