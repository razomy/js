import { ArrowFunction } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as random from '@razomy/random';
import * as tsHir from "@razomy/ts-hir";

export function parseArrowFunction(node: ArrowFunction, ctx: abstractions.patterns.HasEnterLeave): abstractions.translator.LambdaAsn {
  const lambdaAsn: abstractions.translator.LambdaAsn = {
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

  lambdaAsn.parameters = node.getParameters().map(i => tsHir.as.bindings.parseParameter(i, ctx));
  lambdaAsn.returnShape = node.getReturnTypeNode() ? tsHir.as.shapes.parse(node.getReturnTypeNode()!, ctx) : null;
  lambdaAsn.block = tsHir.as.parseNode(node.getBody() as any, ctx) as any;

  return ctx.leave(lambdaAsn, node);
}
