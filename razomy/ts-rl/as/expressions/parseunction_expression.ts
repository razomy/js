import { FunctionExpression } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as tsRl from '@razomy/ts-rl';
import * as random from '@razomy/random';

export function parseunctionExpression(node: FunctionExpression, ctx: abstractions.patterns.HasEnterLeave): abstractions.translators.LambdaAsn {
  const lambdaAsn: abstractions.translators.LambdaAsn = {
    id: random.createUuid(),
    kind: 'LambdaAsn',
    syntaxRole: 'expression',
    modifiers: node.isAsync()
      ? [{ id: random.createUuid(), kind: 'FunctionModifierAsn', syntaxRole: 'modifier', operator: 'async', value: null }]
      : [],
    parameters: [],
    returnShape: null,
    block: null as any,
    semanticLayer: 'state',
  };

  if (!ctx.enter(lambdaAsn, node)) {
    return lambdaAsn;
  }

  lambdaAsn.parameters = node.getParameters().map(i => tsRl.as.bindings.parseParameter(i, ctx));
  lambdaAsn.returnShape = node.getReturnTypeNode() ? tsRl.as.shapes.parse(node.getReturnTypeNode()!, ctx) : null;
  lambdaAsn.block = tsRl.as.parseNode(node.getBody() as any, ctx) as any;

  return ctx.leave(lambdaAsn, node);
}
