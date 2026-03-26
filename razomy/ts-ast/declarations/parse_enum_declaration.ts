import { EnumDeclaration as TsEnumDeclaration } from "ts-morph";
import { parseIdentifier } from "../base/parse_identifier";
import { parseEnumMemberDeclaration } from "./parse_enum_member_declaration";
import * as abstracts from "@razomy/abstracts";
import {parseDescription} from "../functions/parse_description";

export function parseEnumDeclaration(node: TsEnumDeclaration): abstracts.ast.EnumDeclaration {
  return {
    kind: 'EnumDeclaration',
    isPublic: node.isExported(),
    identifier: parseIdentifier(node.getNameNode()),
    properties: node.getMembers().map(m => parseEnumMemberDeclaration(m)),
    description: parseDescription(node.getNameNode()),
  };
}
