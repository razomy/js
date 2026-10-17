import { IfStatement } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";
import * as random from "@razomy/random";

export function parseCondition(node: IfStatement, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.IfAsn {
  const ifAsn: abstractions.translators.IfAsn = {
    id: random.createUuid(),
    kind: 'IfAsn',
    syntaxRole: 'statement',
    branches: [],
  };

  if (!ctx.enter(ifAsn, node)) {
    return ifAsn;
  }

  const branches: abstractions.translators.IfBranchAsnType[] = [];
  branches.push({
    id: random.createUuid(),
    kind: 'ConditionBranchAsn',
    syntaxRole: 'statement',
    pattern: tsRl.ast.expressions.parse(node.getExpression(), ctx),
    value: tsRl.ast.statements.parse(node.getThenStatement(), ctx),
  } as abstractions.translators.ConditionBranchAsn);

  const elseNode = node.getElseStatement();
  if (elseNode) {
    branches.push({
      id: random.createUuid(),
      kind: 'ElseBranchAsn',
      syntaxRole: 'statement',
      value: tsRl.ast.statements.parse(elseNode, ctx),
    } as abstractions.translators.ElseBranchAsn);
  }

  ifAsn.branches = branches;
  return ctx.leave(ifAsn, node);
}