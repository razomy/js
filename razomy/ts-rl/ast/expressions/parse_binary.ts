import { BinaryExpression } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";

export function parseBinary(node: BinaryExpression,ctx:tsRl.ast.HasEnterLeaveProduce): abstractions.translators.BinaryAsn {
  return {
    kind: 'BinaryAsn',
    syntaxRole: 'expression',
    operator: node.getOperatorToken().getText() as abstractions.translators.BinaryAsn['operator'],
    left: tsRl.ast.expressions.parse(node.getLeft(),ctx)!,
    right: tsRl.ast.expressions.parse(node.getRight(),ctx)!,
  };
}
