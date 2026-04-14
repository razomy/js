import {EnumMember} from "ts-morph";
import {parseIdentifier} from "./parse_identifier";
import {parseExpression} from "../expressions/parse_expression";
import * as abstracts from "@razomy/abstracts";
import {parseDescription} from "../doc/parse_description";

export function parseEnumMemberDeclaration(node: EnumMember): abstracts.translators.EnumPropertyBinding {
  return {
    kind: 'EnumPropertyBinding',
    identifier: parseIdentifier(node.getNameNode()),
    expression: node.getInitializer() ? parseExpression(node.getInitializer()!) : null,
    meta: {
      description: parseDescription(node.getNameNode()),
    }
  };
}
