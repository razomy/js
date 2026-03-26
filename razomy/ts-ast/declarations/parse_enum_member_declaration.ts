import { EnumMember } from "ts-morph";
import { parseIdentifier } from "../base/parse_identifier";
import { parseExpression } from "../expressions/parse_expression";
import * as abstracts from "@razomy/abstracts";
import {parseDescription} from "../functions/parse_description";

export function parseEnumMemberDeclaration(node: EnumMember): abstracts.ast.EnumPropertyDeclaration {
  return {
    kind: 'EnumPropertyDeclaration',
    isPublic: true,
    identifier: parseIdentifier(node.getNameNode()),
    expression: node.getInitializer() ? parseExpression(node.getInitializer()!) : null,
    description: parseDescription(node.getNameNode()),
  };
}
