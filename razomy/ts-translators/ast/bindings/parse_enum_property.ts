import { EnumMember } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsTranslators from '@razomy/ts-translators';

export function parseEnumProperty(node: EnumMember): abstracts.translators.EnumPropertyBinding {
  return {
    kind: 'EnumPropertyBinding',
    identifier: tsTranslators.ast.bindings.parseIdentifier(node.getNameNode()),
    expression: node.getInitializer() ? tsTranslators.ast.expressions.parse(node.getInitializer()!) : null,
    meta: {
      description: tsTranslators.ast.doc.tryParseDescription(node.getNameNode()),
    },
  };
}
