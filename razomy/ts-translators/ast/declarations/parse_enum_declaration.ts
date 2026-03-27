import { EnumDeclaration as TsEnumDeclaration } from "ts-morph";
import { parseEnumMemberDeclaration } from "./parse_enum_member_declaration";
import * as abstracts from "@razomy/abstracts";
import {parseDescription} from "../functions/parse_description";
import {parseTypeIdentifier} from "../base";

export function parseEnumDeclaration(node: TsEnumDeclaration): abstracts.translators.EnumDeclaration {
  return {
    kind: 'EnumDeclaration',
    isPublic: node.isExported(),
    identifier: parseTypeIdentifier(node.getNameNode()),
    properties: node.getMembers().map(m => parseEnumMemberDeclaration(m)),
    description: parseDescription(node.getNameNode()),
  };
}
