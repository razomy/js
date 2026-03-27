import {TypeAliasDeclaration as TsTypeAliasDeclaration} from "ts-morph";
import {parseType} from "../types/parse_type";
import * as abstracts from "@razomy/abstracts";
import {parseDescription} from "../functions/parse_description";
import {parseTypeIdentifier} from "../base";

export function parseTypeAliasDeclaration(node: TsTypeAliasDeclaration): abstracts.translators.TypeAliasDeclaration {
  return {
    kind: 'TypeAliasDeclaration',
    isPublic: node.isExported(),
    identifier: parseTypeIdentifier(node.getNameNode()),
    type: parseType(node.getTypeNode()!),
    description: parseDescription(node.getNameNode()),
  };
}
