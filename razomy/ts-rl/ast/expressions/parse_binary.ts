import { BinaryExpression } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseBinary(node: BinaryExpression,ctx:tsRl.ast.HasEnterLeaveProduce): abstracts.translators.BinaryAst {
  return {
    kind: 'BinaryAst',
    syntaxRole: 'expression',
    operator: node.getOperatorToken().getText() as abstracts.translators.BinaryAst['operator'],
    left: tsRl.ast.expressions.parse(node.getLeft(),ctx)!,
    right: tsRl.ast.expressions.parse(node.getRight(),ctx)!,
  };
}
