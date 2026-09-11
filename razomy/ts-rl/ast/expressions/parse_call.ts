import { CallExpression } from 'ts-morph';
import * as abstracts from "@razomy/abstracts";
import * as tsRl from "@razomy/ts-rl";

export function parseCall(node: CallExpression): abstracts.translators.CallAst {
  const expressionNode = node.getExpression();
  const identifierName = expressionNode.getKindName() === 'Identifier' ? expressionNode.getText() : null;
  
  return {
    kind: 'CallAst', syntaxLayer: 2,
    identifier: identifierName ? { name: identifierName } : null,
    arguments_: node.getArguments().map(arg => tsRl.ast.expressions.parse(arg as any)!),
  };
}
