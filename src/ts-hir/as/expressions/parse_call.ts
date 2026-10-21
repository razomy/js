import { CallExpression } from 'ts-morph';
import * as abstractions from "@razomy/abstractions";
import * as random from "@razomy/random";
import * as tsHir from "@razomy/ts-hir";

export function parseCall(node: CallExpression, ctx: abstractions.patterns.HasEnterLeave): abstractions.translator.CallAsn {
  const expressionNode = node.getExpression();
  const identifierName = expressionNode.getKindName() === 'Identifier' ? expressionNode.getText() : null;

  const callAsn: abstractions.translator.CallAsn = {
    id: random.createUuid(),
    kind: 'CallAsn',
    syntaxRole: 'expression',
    identifier: identifierName ? { name: identifierName } : null,
    arguments_: [],
  };

  if (!ctx.enter(callAsn, node)) {
    return callAsn;
  }

  callAsn.arguments_ = node.getArguments().map(arg => tsHir.as.expressions.parse(arg as any, ctx)!);

  return ctx.leave(callAsn, node);
}
