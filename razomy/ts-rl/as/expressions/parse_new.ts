import { NewExpression } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as tsRl from "@razomy/ts-rl";
import * as random from "@razomy/random";

export function parseNew(node: NewExpression, ctx: abstractions.patterns.HasEnterLeave): abstractions.translators.CallAsn {
  const expressionNode = node.getExpression();
  const callAsn: abstractions.translators.CallAsn = {
    id: random.createUuid(),
    kind: 'CallAsn',
    syntaxRole: 'expression',
    identifier: { name: expressionNode.getText() },
    arguments_: [],
  };

  if (!ctx.enter(callAsn, node)) {
    return callAsn;
  }

  callAsn.arguments_ = node.getArguments().map(arg => tsRl.as.expressions.parse(arg as any, ctx)!);

  return ctx.leave(callAsn, node);
}
