import {EnumDeclaration as TsEnumDeclaration} from "ts-morph";
import * as abstracts from "@razomy/abstracts";
import * as tsTranslators from "@razomy/ts-translators";

export function parseEnumDeclaration(node: TsEnumDeclaration): abstracts.translators.EnumBinding {
  return {
    kind: 'EnumBinding',
    identifier: tsTranslators.ast.bindings.parseIdentifier(node.getNameNode()),
    properties: node.getMembers().map(m => tsTranslators.ast.bindings.parseEnumMemberDeclaration(m)),
    meta: {
      description: tsTranslators.ast.doc.parseDescription(node.getNameNode()),
    }
  };
}
