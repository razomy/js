import { CallExpression } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";
import * as random from "@razomy/random";

export function parseCall(node: CallExpression, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.CallAsn {
  const expressionNode = node.getExpression();
  const identifierName = expressionNode.getKindName() === 'Identifier' ? expressionNode.getText() : null;

  const callAsn: abstractions.translators.CallAsn = {
    id: random.createUuid(),
    kind: 'CallAsn',
    syntaxRole: 'expression',
    identifier: identifierName ? { name: identifierName } : null,
    arguments_: [],
  };

  if (!ctx.enter(callAsn, node)) {
    return callAsn;
  }

  callAsn.arguments_ = node.getArguments().map(arg => tsRl.ast.expressions.parse(arg as any, ctx)!);

  return ctx.leave(callAsn, node);
}