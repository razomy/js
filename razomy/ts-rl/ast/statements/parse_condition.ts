import {IfStatement} from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseCondition(node: IfStatement, ctx: tsRl.ast.HasEnterLeaveProduce): abstracts.translators.IfAsn {
  const branches: abstracts.translators.IfBranchAsnType[] = [];
  branches.push({
    kind: 'ConditionBranchAsn',
    syntaxRole: 'statement',
    pattern: tsRl.ast.expressions.parse(node.getExpression(), ctx),
    value: tsRl.ast.statements.parse(node.getThenStatement(), ctx),
  } as abstracts.translators.ConditionBranchAsn);

  const elseNode = node.getElseStatement();
  if (elseNode) {
    branches.push({
      kind: 'ElseBranchAsn',
      syntaxRole: 'statement',
      value: tsRl.ast.statements.parse(elseNode, ctx),
    } as abstracts.translators.ElseBranchAsn);
  }
  return { kind: 'IfAsn', syntaxRole: 'statement', branches };
}
