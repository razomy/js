import { BinaryExpression } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseBinary(node: BinaryExpression): abstracts.translators.BinaryAst {
  return {
    kind: 'BinaryAst',
    syntaxLayer: 2,
    operator: node.getOperatorToken().getText() as abstracts.translators.BinaryAst['operator'],
    left: tsRl.ast.expressions.parse(node.getLeft())!,
    right: tsRl.ast.expressions.parse(node.getRight())!,
  };
}
