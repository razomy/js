import { ArrowFunction } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as tsRl from '@razomy/ts-rl';
import * as random from '@razomy/random';

export function parseArrowFunction(node: ArrowFunction, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.LambdaAsn {
  const lambdaAsn: abstractions.translators.LambdaAsn = {
    id: random.createUuid(),
    kind: 'LambdaAsn',
    syntaxRole: 'expression',
    modifiers: node.isAsync() ? [{ id: random.createUuid(), kind: 'FunctionModifierAsn', syntaxRole: 'modifier', operator: 'async', value: null }] : [],
    parameters: [],
    returnShape: null,
    block: null as any,
    semanticLayer: 'state',
  };

  if (!ctx.enter(lambdaAsn, node)) {
    return lambdaAsn;
  }

  lambdaAsn.parameters = node.getParameters().map(i => tsRl.ast.bindings.parseParameter(i, ctx));
  lambdaAsn.returnShape = node.getReturnTypeNode() ? tsRl.ast.shapes.parse(node.getReturnTypeNode()!, ctx) : null;
  lambdaAsn.block = tsRl.ast.parseNode(node.getBody() as any, ctx) as any;

  return ctx.leave(lambdaAsn, node);
}