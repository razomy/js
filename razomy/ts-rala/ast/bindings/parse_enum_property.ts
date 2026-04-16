import { EnumMember } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRala from "@razomy/ts-rala";

export function parseEnumProperty(node: EnumMember): abstracts.translators.EnumPropertyBinding {
  return {
    kind: 'EnumPropertyBinding',
    identifier: tsRala.ast.bindings.parseIdentifier(node.getNameNode()),
    expression: node.getInitializer() ? tsRala.ast.expressions.parse(node.getInitializer()!) : null,
    meta: {
      description: tsRala.ast.doc.tryParseDescription(node.getNameNode()),
    },
  };
}
