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
    modifiers: [node.hasQuestionToken() ? 'optional' : null, node.isReadonly() ? 'readonly' : null].filter(
      (i) => i != null,
    ) as abstracts.translators.Modifier[],
    meta: { description: tsTranslators.ast.doc.parseDescription(node.getNameNode()) },
  };
}
