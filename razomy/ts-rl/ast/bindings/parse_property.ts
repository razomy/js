import { PropertyDeclaration } from 'ts-morph';
import * as abstractions from '@razomy/abstractions';
import * as tsRl from '@razomy/ts-rl';

export function parseProperty(node: PropertyDeclaration, ctx: tsRl.ast.HasEnterLeaveProduce): abstractions.translators.PropertyAsn {
  return {
    kind: 'PropertyAsn',
    syntaxRole: 'expression',
    semanticLayer: 'state',
    identifier: { name: node.getName() },
    shape: node.getTypeNode() ? tsRl.ast.shapes.parse(node.getTypeNode()!, ctx) : null,
    value: node.getInitializer() ? tsRl.ast.expressions.parse(node.getInitializer()!, ctx) : null,
  };
}
