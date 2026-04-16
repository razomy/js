import { EnumDeclaration as TsEnumDeclaration } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsLang from '../..';

export function parseEnum(node: TsEnumDeclaration): abstracts.translators.EnumBinding {
  return {
    kind: 'EnumBinding',
    identifier: tsLang.ast.bindings.parseIdentifier(node.getNameNode()),
    properties: node.getMembers().map((m) => tsLang.ast.bindings.parseEnumProperty(m)),
    meta: {
      description: tsLang.ast.doc.tryParseDescription(node.getNameNode()),
    },
  };
}
