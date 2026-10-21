import { SwitchStatement, Node } from "ts-morph";
import * as abstractions from "@razomy/abstractions";
import * as random from "@razomy/random";
import * as tsHir from "@razomy/ts-hir";

export function parseSwitch(node: SwitchStatement, ctx: abstractions.patterns.HasEnterLeave): abstractions.translator.SwitchAsn {
  const switchAsn: abstractions.translator.SwitchAsn = {
    id: random.createUuid(),
    kind: 'SwitchAsn',
    target: null as any,
    syntaxRole: 'statement',
    branches: [],
  };

  if (!ctx.enter(switchAsn, node)) {
    return switchAsn;
  }

  const targetExpression = tsHir.as.expressions.parse(node.getExpression(), ctx);
  const branches: abstractions.translator.SwitchBranchAsnType[] = [];
  const clauses = node.getCaseBlock().getClauses();

  for (const clause of clauses) {
    const statements = clause.getStatements();
    const parsedValue = statements.map(stmt => tsHir.as.statements.parse(stmt, ctx));

    if (Node.isCaseClause(clause)) {
      branches.push({
        id: random.createUuid(),
        kind: 'MatchBranchAsn',
        syntaxRole: 'statement',
        pattern: tsHir.as.expressions.parse(clause.getExpression(), ctx),
        value: {
          id: random.createUuid(),
          kind: 'BlockAsn',
          syntaxRole: 'statement',
          statements: parsedValue,
        },
      } as abstractions.translator.MatchBranchAsn);
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
      } as abstractions.translator.DefaultBranchAsn);
    }
  }

  switchAsn.target = targetExpression;
  switchAsn.branches = branches;

  return ctx.leave(switchAsn, node);
}
