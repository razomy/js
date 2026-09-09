import { EnumMember } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from "@razomy/ts-rl";

export function parseEnumProperty(node: EnumMember): abstracts.translators.EnumPropertyBinding {
  return {
    kind: 'EnumPropertyBinding',
    identifier: tsRl.ast.bindings.parseIdentifier(node.getNameNode()),
    expression: node.getInitializer() ? tsRl.ast.expressions.parse(node.getInitializer()!) : null,
    meta: {
      description: tsRl.ast.doc.tryParseDescription(node.getNameNode()),
    },
  };
}
