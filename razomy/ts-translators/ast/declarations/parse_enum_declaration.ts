import { EnumDeclaration as TsEnumDeclaration } from "ts-morph";
import { parseEnumMemberDeclaration } from "./parse_enum_member_declaration";
import * as abstracts from "@razomy/abstracts";
import {parseDescription} from "../functions/parse_description";
import {parseIdentifier} from "../base";

export function parseEnumDeclaration(node: TsEnumDeclaration): abstracts.translators.EnumBinding {
  return {
    kind: 'EnumBinding',
    identifier: parseIdentifier(node.getNameNode()),
    properties: node.getMembers().map(m => parseEnumMemberDeclaration(m)),
    description: parseDescription(node.getNameNode()),
  };
}
