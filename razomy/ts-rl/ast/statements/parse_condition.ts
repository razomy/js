import { IfStatement } from 'ts-morph';
import * as translators from '@razomy/abstracts/translators';
import { parse as parseExpr } from "../expressions/parse";
import { parseBlock } from "./parse_block";

export function parseCondition(node: IfStatement): translators.IfAst {
  const branches: translators.IfBranchAst[] = [];
  branches.push({
    kind: 'ConditionBranchAst', syntaxLayer: 3,
    pattern: parseExpr(node.getExpression()),
    value: parseBlock(node.getThenStatement()),
  } as translators.ConditionBranchAst);

  const elseNode = node.getElseStatement();
  if (elseNode) {
    branches.push({
      kind: 'ElseBranchAst',
      syntaxLayer: 3,
      value: parseBlock(elseNode),
    } as translators.ElseBranchAst);
  }
  return { kind: 'IfAst', syntaxLayer: 3, branches };
}
