import {ConditionalExpression} from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseCondition(node: ConditionalExpression): abstracts.translators.TernaryAst {
  return {
    kind: 'TernaryAst', syntaxLayer: 2,
    branches: [
      {
        kind: 'ConditionBranchAst',
        syntaxLayer: 2,
        pattern: tsRl.ast.expressions.parse(node.getCondition())!,
        value: tsRl.ast.expressions.parse(node.getWhenTrue())!
      } as abstracts.translators.ConditionBranchAst,
      {kind: 'ElseBranchAst', syntaxLayer: 2, value: tsRl.ast.expressions.parse(node.getWhenFalse())!} as abstracts.translators.ElseBranchAst
    ]
  };
}
