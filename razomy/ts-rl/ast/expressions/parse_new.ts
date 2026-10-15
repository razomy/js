import { NewExpression } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";

export function parseNew(node: NewExpression, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.CallAsn {
  const expressionNode = node.getExpression();
  return {
    kind: 'CallAsn', syntaxRole: 'expression',
    identifier: { name: expressionNode.getText() }, // CallAsn in model acts as generic invoke
    arguments_: node.getArguments().map(arg => tsRl.ast.expressions.parse(arg as any, ctx)!),
  };
}
