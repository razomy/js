import { EnumDeclaration as TsEnumDeclaration } from 'ts-morph';
import * as abstracts from '@razomy/abstracts';
import * as tsRl from "@razomy/ts-rl";

export function parseEnum(node: TsEnumDeclaration): abstracts.translators.EnumAst {
  return {
    kind: 'EnumAst',
    identifier: tsRl.ast.bindings.parseIdentifier(node.getNameNode()),
    properties: node.getMembers().map((m) => tsRl.ast.bindings.parseEnumProperty(m)),
  };
}
