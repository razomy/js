import { FunctionExpression } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from '@razomy/ts-rl';

export function parseunctionExpression(node: FunctionExpression): abstracts.translators.LambdaAst {
  return {
    kind: 'LambdaAst',
    syntaxRole: 'expression',
    modifiers: node.isAsync()
      ? [{ kind: 'FunctionModifierAst', syntaxRole: 'modifier', operator: 'async', value: null }]
      : [],
    parameters: node.getParameters().map(tsRl.ast.bindings.parseParameter),
    returnShape: node.getReturnTypeNode() ? tsRl.ast.shapes.parse(node.getReturnTypeNode()!) : null,
    block: tsRl.ast.parseNode(node.getBody() as any) as any,
    semanticLayer: 'state',
  };
}
