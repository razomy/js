import { PropertyDeclaration } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from '@razomy/ts-rl';

export function parseProperty(node: PropertyDeclaration): abstracts.translators.PropertyAst {
  return {
    kind: 'PropertyAst',
    syntaxLayer: 2,
    semanticLayer: 1,
    identifier: { name: node.getName() },
    shape: node.getTypeNode() ? tsRl.ast.shapes.parse(node.getTypeNode()!) : null,
    value: node.getInitializer() ? tsRl.ast.expressions.parse(node.getInitializer()!) : null,
  };
}
