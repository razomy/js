import { PropertyDeclaration, PropertySignature as TsPropertySignature } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsTranslators from '@razomy/ts-translators';

export function parseProperty(
  node: TsPropertySignature | PropertyDeclaration,
): abstracts.translators.PropertyBinding {
  return {
    kind: 'PropertyBinding',
    identifier: tsTranslators.ast.bindings.parseIdentifier(node.getNameNode()),
    shape: node.getTypeNode() ? tsTranslators.ast.shapes.parse(node.getTypeNode()!) : null,
    expression: node.getInitializer() ? tsTranslators.ast.expressions.parse(node.getInitializer()!) : null,
    modifiers: [node.hasQuestionToken() ? 'optional' as const : null, node.isReadonly() ? 'const' as const : null].filter(
      (i) => i != null,
    ),
    meta: { description: tsTranslators.ast.doc.tryParseDescription(node.getNameNode()) },
  };
}
