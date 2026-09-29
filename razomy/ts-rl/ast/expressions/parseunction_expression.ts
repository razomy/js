import { FunctionExpression } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from '@razomy/ts-rl';

export function parseunctionExpression(node: FunctionExpression, ctx: tsRl.ast.HasEnterLeaveProduce): abstracts.translators.LambdaAst {
  return {
    kind: 'LambdaAst',
    syntaxRole: 'expression',
    modifiers: node.isAsync()
      ? [{ kind: 'FunctionModifierAst', syntaxRole: 'modifier', operator: 'async', value: null }]
      : [],
    parameters: node.getParameters().map(i=>tsRl.ast.bindings.parseParameter(i,ctx)),
    returnShape: node.getReturnTypeNode() ? tsRl.ast.shapes.parse(node.getReturnTypeNode()!, ctx) : null,
    block: tsRl.ast.parseNode(node.getBody() as any, ctx) as any,
    semanticLayer: 'state',
  };
}
