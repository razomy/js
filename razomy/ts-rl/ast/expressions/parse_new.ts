import { NewExpression } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseNew(node: NewExpression): abstracts.translators.CallAst {
  const expressionNode = node.getExpression();
  return {
    kind: 'CallAst', syntaxLayer: 2,
    identifier: { name: expressionNode.getText() }, // CallAst in model acts as generic invoke
    arguments_: node.getArguments().map(arg => tsRl.ast.expressions.parse(arg as any)!),
  };
}
