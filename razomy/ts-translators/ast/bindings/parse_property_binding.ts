import { PropertyDeclaration, PropertySignature as TsPropertySignature } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsTranslators from '@razomy/ts-translators';

export function parsePropertyBinding(
  node: TsPropertySignature | PropertyDeclaration,
): abstracts.translators.PropertyBinding {
  return {
    kind: 'PropertyBinding',
    identifier: tsTranslators.ast.bindings.parseIdentifier(node.getNameNode()),
    shapeIdentifier: node.getTypeNode() ? tsTranslators.ast.shapes.parseShapeIdentifier(node.getTypeNode()!) : null,
    expression: node.getInitializer() ? tsTranslators.ast.expressions.parseExpression(node.getInitializer()!) : null,
    modifiers: [node.hasQuestionToken() ? 'optional' as const : null, node.isReadonly() ? 'const' as const : null].filter(
      (i) => i != null,
    ),
    meta: { description: tsTranslators.ast.doc.parseDescription(node.getNameNode()) },
  };
}
