import { TypeAliasDeclaration as TsTypeAliasDeclaration } from "ts-morph";
import { parseIdentifier } from "../base/parse_identifier";
import { parseType } from "../types/parse_type";
import * as abstracts from "@razomy/abstracts";
import {parseDescription} from "../functions/parse_description";

export function parseTypeAliasDeclaration(node: TsTypeAliasDeclaration): abstracts.ast.TypeAliasDeclaration {
  return {
    kind: 'TypeAliasDeclaration',
    isPublic: node.isExported(),
    identifier: parseIdentifier(node.getNameNode()),
    type: parseType(node.getTypeNode()!),
    description: parseDescription(node.getNameNode()),
  };
}
