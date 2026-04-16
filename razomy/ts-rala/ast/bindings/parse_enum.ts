import { EnumDeclaration as TsEnumDeclaration } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRala from "@razomy/ts-rala";

export function parseEnum(node: TsEnumDeclaration): abstracts.translators.EnumBinding {
  return {
    kind: 'EnumBinding',
    identifier: tsRala.ast.bindings.parseIdentifier(node.getNameNode()),
    properties: node.getMembers().map((m) => tsRala.ast.bindings.parseEnumProperty(m)),
    meta: {
      description: tsRala.ast.doc.tryParseDescription(node.getNameNode()),
    },
  };
}
