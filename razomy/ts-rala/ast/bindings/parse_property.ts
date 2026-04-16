import { PropertyDeclaration, PropertySignature as TsPropertySignature } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRala from "@razomy/ts-rala";

export function parseProperty(
  node: TsPropertySignature | PropertyDeclaration,
): abstracts.translators.PropertyBinding {
  return {
    kind: 'PropertyBinding',
    identifier: tsRala.ast.bindings.parseIdentifier(node.getNameNode()),
    shape: node.getTypeNode() ? tsRala.ast.shapes.parse(node.getTypeNode()!) : null,
    expression: node.getInitializer() ? tsRala.ast.expressions.parse(node.getInitializer()!) : null,
    modifiers: [node.hasQuestionToken() ? 'optional' as const : null, node.isReadonly() ? 'const' as const : null].filter(
      (i) => i != null,
    ),
    meta: { description: tsRala.ast.doc.tryParseDescription(node.getNameNode()) },
  };
}
