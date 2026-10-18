import { IfStatement } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";
import * as random from "@razomy/random";

export function parseCondition(node: IfStatement, ctx: abstractions.patterns.HasEnterLeave): abstractions.translator.IfAsn {
  const ifAsn: abstractions.translator.IfAsn = {
    id: random.createUuid(),
    kind: 'IfAsn',
    syntaxRole: 'statement',
    branches: [],
  };

  if (!ctx.enter(ifAsn, node)) {
    return ifAsn;
  }

  const branches: abstractions.translator.IfBranchAsnType[] = [];
  branches.push({
    id: random.createUuid(),
    kind: 'ConditionBranchAsn',
    syntaxRole: 'statement',
    pattern: tsRl.as.expressions.parse(node.getExpression(), ctx),
    value: tsRl.as.statements.parse(node.getThenStatement(), ctx),
  } as abstractions.translator.ConditionBranchAsn);

  const elseNode = node.getElseStatement();
  if (elseNode) {
    branches.push({
      id: random.createUuid(),
      kind: 'ElseBranchAsn',
      syntaxRole: 'statement',
      value: tsRl.as.statements.parse(elseNode, ctx),
    } as abstractions.translator.ElseBranchAsn);
  }

  ifAsn.branches = branches;
  return ctx.leave(ifAsn, node);
}
