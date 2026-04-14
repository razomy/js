import {EnumDeclaration as TsEnumDeclaration} from "ts-morph";
import {parseEnumMemberDeclaration} from "./parse_enum_member_declaration";
import * as abstracts from "@razomy/abstracts";
import {parseDescription} from "../doc/parse_description";
import {parseIdentifier} from "./parse_identifier";

export function parseEnumDeclaration(node: TsEnumDeclaration): abstracts.translators.EnumBinding {
  return {
    kind: 'EnumBinding',
    identifier: parseIdentifier(node.getNameNode()),
    properties: node.getMembers().map(m => parseEnumMemberDeclaration(m)),
    meta: {
      description: parseDescription(node.getNameNode()),
    }
  };
}
