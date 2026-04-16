import { PropertyDeclaration, PropertySignature as TsPropertySignature } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsLang from '../..';

export function parseProperty(
  node: TsPropertySignature | PropertyDeclaration,
): abstracts.translators.PropertyBinding {
  return {
    kind: 'PropertyBinding',
    identifier: tsLang.ast.bindings.parseIdentifier(node.getNameNode()),
    shape: node.getTypeNode() ? tsLang.ast.shapes.parse(node.getTypeNode()!) : null,
    expression: node.getInitializer() ? tsLang.ast.expressions.parse(node.getInitializer()!) : null,
    modifiers: [node.hasQuestionToken() ? 'optional' as const : null, node.isReadonly() ? 'const' as const : null].filter(
      (i) => i != null,
    ),
    meta: { description: tsLang.ast.doc.tryParseDescription(node.getNameNode()) },
  };
}
