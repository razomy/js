import {IfStatement} from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseCondition(node: IfStatement): abstracts.translators.IfAst {
  const branches: abstracts.translators.IfBranchAstType[] = [];
  branches.push({
    kind: 'ConditionBranchAst',
    syntaxLayer: 'statement',
    pattern: tsRl.ast.expressions.parse(node.getExpression()),
    value: tsRl.ast.statements.parse(node.getThenStatement()),
  } as abstracts.translators.ConditionBranchAst);

  const elseNode = node.getElseStatement();
  if (elseNode) {
    branches.push({
      kind: 'ElseBranchAst',
      syntaxLayer: 'statement',
      value: tsRl.ast.statements.parse(elseNode),
    } as abstracts.translators.ElseBranchAst);
  }
  return { kind: 'IfAst', syntaxLayer: 'statement', branches };
}
