import { EnumMember } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsLang from '../..';

export function parseEnumProperty(node: EnumMember): abstracts.translators.EnumPropertyBinding {
  return {
    kind: 'EnumPropertyBinding',
    identifier: tsLang.ast.bindings.parseIdentifier(node.getNameNode()),
    expression: node.getInitializer() ? tsLang.ast.expressions.parse(node.getInitializer()!) : null,
    meta: {
      description: tsLang.ast.doc.tryParseDescription(node.getNameNode()),
    },
  };
}
