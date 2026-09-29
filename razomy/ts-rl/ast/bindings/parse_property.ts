import { PropertyDeclaration } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from '@razomy/ts-rl';

export function parseProperty(node: PropertyDeclaration, ctx: tsRl.ast.HasEnterLeaveProduce): abstracts.translators.PropertyAst {
  return {
    kind: 'PropertyAst',
    syntaxRole: 'expression',
    semanticLayer: 'state',
    identifier: { name: node.getName() },
    shape: node.getTypeNode() ? tsRl.ast.shapes.parse(node.getTypeNode()!, ctx) : null,
    value: node.getInitializer() ? tsRl.ast.expressions.parse(node.getInitializer()!, ctx) : null,
  };
}
