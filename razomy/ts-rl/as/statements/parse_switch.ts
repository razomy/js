import { SwitchStatement, Node } from "ts-morph";
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";
import * as random from "@razomy/random";

export function parseSwitch(node: SwitchStatement, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.SwitchAsn {
  const switchAsn: abstractions.translators.SwitchAsn = {
    id: random.createUuid(),
    kind: 'SwitchAsn',
    target: null as any,
    syntaxRole: 'statement',
    branches: [],
  };

  if (!ctx.enter(switchAsn, node)) {
    return switchAsn;
  }

  const targetExpression = tsRl.ast.expressions.parse(node.getExpression(), ctx);
  const branches: abstractions.translators.SwitchBranchAsnType[] = [];
  const clauses = node.getCaseBlock().getClauses();

  for (const clause of clauses) {
    const statements = clause.getStatements();
    const parsedValue = statements.map(stmt => tsRl.ast.statements.parse(stmt, ctx));

    if (Node.isCaseClause(clause)) {
      branches.push({
        id: random.createUuid(),
        kind: 'MatchBranchAsn',
        syntaxRole: 'statement',
        pattern: tsRl.ast.expressions.parse(clause.getExpression(), ctx),
        value: {
          id: random.createUuid(),
          kind: 'BlockAsn',
          syntaxRole: 'statement',
          statements: parsedValue,
        },
      } as abstractions.translators.MatchBranchAsn);
    } else if (Node.isDefaultClause(clause)) {
      branches.push({
        id: random.createUuid(),
        kind: 'DefaultBranchAsn',
        syntaxRole: 'statement',
        value: {
          id: random.createUuid(),
          kind: 'BlockAsn',
          syntaxRole: 'statement',
          statements: parsedValue,
        },
      } as abstractions.translators.DefaultBranchAsn);
    }
  }

  switchAsn.target = targetExpression;
  switchAsn.branches = branches;

  return ctx.leave(switchAsn, node);
}