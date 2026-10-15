import { ArrowFunction } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as tsRl from '@razomy/ts-rl';

export function parseArrowFunction(node: ArrowFunction, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.LambdaAsn {
  return {
    kind: 'LambdaAsn',
    syntaxRole: 'expression',
    modifiers: node.isAsync() ? [{ kind: 'FunctionModifierAsn', syntaxRole: 'modifier', operator: 'async', value: null }] : [],
    parameters: node.getParameters().map(i=>tsRl.ast.bindings.parseParameter(i,ctx)),
    returnShape: node.getReturnTypeNode() ? tsRl.ast.shapes.parse(node.getReturnTypeNode()!,ctx) : null,
    block: tsRl.ast.parseNode(node.getBody() as any, ctx) as any,
    semanticLayer: 'state',
  };
}
